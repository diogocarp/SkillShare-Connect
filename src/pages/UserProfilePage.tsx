import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper, Avatar, Button } from '@material-ui/core';
import TopMenu from '../components/TopMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  largeAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 'auto',
  },
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <>
    <TopMenu/>
    <div className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Meu Perfil
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Avatar alt="Nome do Usuário" src="/avatar.jpg" className={classes.largeAvatar} />
            <Typography variant="h5" gutterBottom>
              Nome do Usuário
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Cargo / Profissão
            </Typography>
            <Typography variant="body1">
              Sobre mim: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              Editar Perfil
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
          </Paper>
        </Grid>
      </Grid>
    </div>
    </>
  );
};

export default Profile;
