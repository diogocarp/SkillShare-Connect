import { Typography, Container, Grid, Card, CardHeader, CardContent, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import TopMenu from '../components/TopMenu';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Api } from '../api/Api';
import SecureLS from 'secure-ls';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: blue[500],
  },
  title: {
    flexGrow: 1,
  },
  card: {
    marginBottom: theme.spacing(2),
  },
}));

const HomePage = () => {
  const ls = new SecureLS({ encodingType: 'aes', isCompression: false });
  const userData = JSON.parse(ls.get('userData'));

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Api.get('http://localhost:3000/posts/');
        setPosts(response.data);
      } catch (error) {
        alert('Ocorreu um erro ao carregar os posts! ' + error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersMap = {};
        await Promise.all(posts.map(async post => {
          const response = await Api.get(`http://localhost:3000/users/${post.userEmail}`);
          usersMap[post.user] = response.data;
        }));
        setUsers(usersMap);
      } catch (error) {
        alert('Ocorreu um erro ao carregar os usuários! ' + error);
      }
    };
    fetchUsers();
  }, [posts]);
  
  return (
    <>
      <TopMenu />
      <br />
      <Button component={Link} to="/postcreate" color="default">Criar Post</Button>
      <br />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
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
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardHeader
                title="Amigos"
              />
              <CardContent>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
