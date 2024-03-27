import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button, Container, Chip, MenuItem } from "@material-ui/core";
import TopMenu from "../components/TopMenu";
import { Api } from "../api/Api";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const UserRegister = () => {
  const classes = useStyles();
  const [user, setUser] = useState({ username: "", email: "", password: "", skills: [] });
  const [newSkill, setNewSkill] = useState("");
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('https://api.github.com/languages');
        setLanguages(response.data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setUser((prevState) => ({
        ...prevState,
        skills: [...prevState.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (index) => {
    setUser((prevState) => ({
      ...prevState,
      skills: prevState.skills.filter((_, i) => i !== index),
    }));
  };

  const onFinish = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post("http://localhost:3000/users", user);
      console.log(response);
      alert("Cadastrado com sucesso!");
      navigate("/userlogin");
    } catch (error) {
      alert("Erro ao enviar dados:" + error);
    }
  };

  return (
    <>
      <TopMenu />
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
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              select
              label="Habilidades"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Button variant="contained" color="primary" onClick={handleAddSkill}>
                    Adicionar
                  </Button>
                ),
              }}
            >
              {languages.map((language) => (
                <MenuItem key={language.name} value={language.name}>
                {language.name}
              </MenuItem>              
              ))}
            </TextField>
                
            <div>
              {user.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleDeleteSkill(index)}
                  className={classes.chip}
                />
              ))}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Salvar
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default UserRegister;
