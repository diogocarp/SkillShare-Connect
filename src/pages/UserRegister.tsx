import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, Container } from '@material-ui/core';
import TopMenu from '../components/TopMenu';
import { Api } from '../api/Api';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  
  root: {
    marginTop: theme.spacing(4),
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserRegister = () => {
  const classes = useStyles();
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const onFinish = async (e) => {
    e.preventDefault(); 
    

    try {
        const response = await Api.post('http://localhost:3000/users', user);
        console.log(response)
        alert('Cadastrado com sucesso!');
        navigate('/userlogin')
    } catch (error) {
        alert('Erro ao enviar dados:' + error);
    }
};
  return (
    <>
    <TopMenu/>
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <form className={classes.form} onSubmit={onFinish}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Primeiro Nome"
            name="username"
            autoFocus
            value={user.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={user.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="new-password"
            value={user.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Cadastrar
          </Button>
        </form>
      </div>
    </Container>
    </>
  );
};

export default UserRegister;
