import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button, Container } from "@material-ui/core";
import TopMenu from "../components/TopMenuLogin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SecureLS from "secure-ls";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserLogin = () => {
  const [user, setUser] = useState({});
  const classes = useStyles();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFinish = async (e) => {
    e.preventDefault();
    const ls = new SecureLS({ encodingType: "aes", isCompression: false });

    try {
      const response = await axios.get(
        `http://localhost:3000/users/${user.email}`
      );
      const userData = response.data;
      const emailResp = userData.email;
      const passwordResp = userData.password;
      if (emailResp !== user.email) {
        alert("Email incorreto!");
        return;
      }
      if (passwordResp !== user.password) {
        alert("Senha incorreta!");
        return;
      }
      alert("Login feito com sucesso!");
      ls.set("userData", JSON.stringify(userData));
      navigate("/feed");
    } catch (error) {
      console.log(error);
      alert(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
    }
  };

  return (
    <>
      <TopMenu />
      <Container component="main" maxWidth="xs">
        <div className={classes.root}>
          <Typography component="h1" variant="h5">
            Esqueci minha senha
          </Typography>
          <form className={classes.form} onSubmit={onFinish}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email || ""}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Enviar codigo!
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default UserLogin;
