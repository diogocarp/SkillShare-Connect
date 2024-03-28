import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    "&:hover": {
      backgroundColor: "#a29ebc",
    },
  },
}));

const TopMenuLogin = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">
          SkillShare
        </Typography>
        <div>
          <Button 
            component={Link} 
            to="/userregister" 
            color="inherit"
            className={classes.button} // Aplica o estilo personalizado do hover
          >
            Cadastre-se agora!!
          </Button>
          <Button 
            component={Link} 
            to="/UserLogin" 
            color="inherit"
            className={classes.button} >
            Entrar
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenuLogin;
