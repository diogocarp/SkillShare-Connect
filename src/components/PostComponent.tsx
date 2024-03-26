import { Card, CardHeader, Avatar, Typography, CardContent } from '@material-ui/core';

const PostContainer = ({ posts, users, classes }) => {
  return (
    <>
      {posts.map(post => (
        <Card key={post._id} className={classes.card}>
          <CardHeader
            avatar={
              <Avatar alt={users[post.user]?.username} src="/avatar.jpg" />
            }
            title={users[post.user]?.username}
            subheader="3 horas atrás"
          />
          <Typography variant="h6" color="primary" style={{ marginLeft: '1em' }}>
            {post.title}
          </Typography>
          <hr />
          <CardContent>
            <Typography variant="body1" color="textPrimary">
              {post.description}
            </Typography>
            <br/>                  
            <center>
              <div style={{maxWidth: '500px', maxHeight:'500px'}}>
                <img alt={post.title} src={post.image} style={{ width: '100%', height: '100%', objectFit:'fill' }} />
              </div>
            </center>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default PostContainer;
