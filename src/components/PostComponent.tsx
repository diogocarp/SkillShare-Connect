import { Card, CardHeader, Avatar, Typography, CardContent } from '@material-ui/core';
import { format } from 'date-fns';

const PostContainer = ({ posts, classes }) => {

    function getFormattedDate(date: Date){
        const formattedDate: string = format(date, 'dd/MM/yyyy')
        return formattedDate
    }
  
  return (
    <>
      {posts.map(post => (
        
        <Card key={post._id} className={classes.card}>
          <CardHeader
            avatar={
              <Avatar alt={post.username} src="/avatar.jpg" />
            }
            title={post.username}
            subheader={getFormattedDate(post.date)}
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
