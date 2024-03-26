import { useEffect, useState } from 'react';
import { Container, Grid, Button, Card, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import TopMenu from '../components/TopMenu';
import { Link } from 'react-router-dom';
import { Api } from '../api/Api';
import SecureLS from 'secure-ls';
import PostComponent from '../components/PostComponent'; 

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
  
  return (
    <>
      <TopMenu />
      <br />
      <Button component={Link} to="/postcreate" color="default">Criar Post</Button>
      <br />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <PostComponent posts={posts} classes={classes} /> 
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardHeader
                title="Amigos"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
