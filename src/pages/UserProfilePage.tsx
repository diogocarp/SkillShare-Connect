import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper, Avatar, Button } from "@material-ui/core";
import TopMenu from "../components/TopMenu";
import SecureLS from "secure-ls";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../api/Api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  largeAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "auto",
  },
}));

const Profile = () => {

  const classes = useStyles();
  const ls = new SecureLS({ encodingType: "aes", isCompression: false });
  const userdata = JSON.parse(ls.get("userData"));
  const [user, setUser] =  useState({ username: "", email: "", password: "", skills: [] });

  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        
        const response = await Api.get(`http://localhost:3000/users/${userdata.email}`);
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  },[]);

  console.log(user)

  return (
    <>
      <TopMenu />
      <div className={classes.root}>
        <Typography variant="h4" align="center" gutterBottom>
          Meu Perfil
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Avatar
                alt={user.username}
                src="/avatar.jpg"
                className={classes.largeAvatar}
              />
              <br />
              <Typography variant="h5" gutterBottom>
                {user.username}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {user.role}
              </Typography>
              <Typography variant="body1">
                Habilidades:{' '}
                {user.skills.join(', ')}
              </Typography>

              <br/>
              <Button component={Link} to='/useredit' variant="contained" color="primary" fullWidth>
                Editar Perfil
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}></Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Profile;
