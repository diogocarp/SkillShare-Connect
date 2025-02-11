import React, { useState, useEffect } from "react";
import { Container, Grid, Button, Card, CardHeader, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import TopMenu from "../components/TopMenu";
import { Link } from "react-router-dom";
import { Api } from "../api/Api";
import SecureLS from "secure-ls";
import PostComponent from "../components/PostComponent";

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
  footerCard: {
    position: "fixed",
    bottom: 0,
    right: 0,
    zIndex: 1000,
    width: "100%",
    maxWidth: "30%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const HomePage = () => {
  const ls = new SecureLS({ encodingType: "aes", isCompression: false });
  const userdata = JSON.parse(ls.get("userData"));

  const [posts, setPosts] = useState([]);
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Api.get("http://localhost:3000/posts/");
        setPosts(response.data);
      } catch (error) {
        alert("Ocorreu um erro ao carregar os posts! " + error);
      }
    };
    fetchPosts();
  }, []);

  const toggleFooter = () => {
    setIsFooterExpanded(!isFooterExpanded);
  };

  return (
    <>
      <TopMenu />
      <br />
      <Button component={Link} to="/postcreate" color="default">
        Criar Post
      </Button>
      <br />
      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <PostComponent posts={posts} classes={classes} />
          </Grid>
        </Grid>
        <Card className={classes.footerCard} onClick={toggleFooter}>
          <CardHeader title="Amigos" />
          {isFooterExpanded && (
            <CardContent>
              <p>Conteúdo do footer aqui...</p>
            </CardContent>
          )}
        </Card>
      </Container>
    </>
  );
};

export default HomePage;
