import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  CardContent,
  TextField,
  Button,
  Collapse,
} from "@material-ui/core";
import { format } from "date-fns";
import { Api } from "../api/Api";
import SecureLS from "secure-ls";

const PostContainer = ({ posts, classes }) => {
  const [comments, setComments] = useState({});
  const [expandedPostId, setExpandedPostId] = useState(null);
  const ls = new SecureLS({ encodingType: "aes", isCompression: false });
  const userdata = JSON.parse(ls.get("userData"));

  const handleCommentChange = (postId, e) => {
    const { value } = e.target;
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: value,
    }));
  };

  const getFormattedDate = (date) => {
    const formattedDate = format(new Date(date), "dd/MM/yyyy");
    return formattedDate;
  };

  const handleCommentSubmit = async (postId, post) => {
      try {
      const postComment = {
      title: post.title,
      description: post.description,
      image: post.image,
      comments : [...post.comments, {
        username: userdata.username,
        comment: comments[postId]
      }]
    }

      const response = await Api.put(`http://localhost:3000/posts/${postId}`, postComment);
      console.log(response);
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: "",
      }));
    } catch (error) {
      console.error("Erro ao enviar o comentário:", error);
      alert("Erro ao enviar o comentário");
    }
    window.location.reload(); 

  };

  const handleExpandClick = (postId) => {
    setExpandedPostId(postId === expandedPostId ? null : postId);
  };

  return (
    <>
      {posts.map((post) => (
        <Card key={post._id} className={classes.card}>
          <CardHeader
            avatar={<Avatar alt={post.username} src="/avatar.jpg" />}
            title={post.username}
            subheader={getFormattedDate(post.date)}
          />
          <Typography
            variant="h6"
            color="primary"
            style={{ marginLeft: "1em" }}
          >
            {post.title}
          </Typography>
          <hr />
          <CardContent>
            <Typography variant="body1" color="textPrimary">
              {post.description}
            </Typography>
            <br />
            <center>
              <div style={{ maxWidth: "500px", maxHeight: "500px" }}>
                <img
                  alt={post.title}
                  src={post.image}
                  style={{ width: "100%", height: "100%", objectFit: "fill" }}
                />
              </div>
            </center>
            <hr />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Comentar..."
              value={comments[post._id] || ""}
              onChange={(e) => handleCommentChange(post._id, e)}
              InputProps={{
                endAdornment: (
                  <Button
                  style={{ marginLeft: "1em" }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleCommentSubmit(post._id, post)}
                  >
                    Enviar
                  </Button>
                )}}
            />
            <Typography
                    variant="body1"
                    color="textPrimary"
                    style={{ marginLeft: "1em",marginTop: "1em" }}
                  > Comentários: 
                    {' '+ post.comments.length}
                  
            {post.comments.length > 1 && (
              <Button
                color="primary"
                onClick={() => handleExpandClick(post._id)}
                style={{ marginLeft: "1em", marginRight: "1em", float: 'right' }}
              >
                {expandedPostId === post._id ? "Ver menos" : "Ver mais"}
              </Button>
            )}
            </Typography>
            <Collapse
              in={expandedPostId === post._id}
              timeout="auto"
              unmountOnExit
            >
              {post.comments.map((comment, index) => (
                <div key={index} className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar alt={comment.username} src="/avatar.jpg" />
                    }
                    title={comment.username}
                  />
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    style={{ marginLeft: "1em" }}
                  >
                    {comment.comment}
                  </Typography>
                  <hr/> 
                </div>
                
              ))}
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default PostContainer;
