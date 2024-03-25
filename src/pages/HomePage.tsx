
import { Typography, Container, Grid, Card, CardHeader, CardContent, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import TopMenu from '../components/TopMenu';

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
  const classes = useStyles();

  return (
    <>
      <TopMenu/>
      <br/>
      <br/>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="profile-pic">U</Avatar>
                }
                title="Usuário Exemplo"
                subheader="3 horas atrás"
              />
              <CardContent>
                <Typography variant="body1" color="textPrimary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus, nisi id aliquam tincidunt, justo turpis vestibulum libero, sed tincidunt metus lacus ac elit.
                </Typography>
              </CardContent>
            </Card>
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
