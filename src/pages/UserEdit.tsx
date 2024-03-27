import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button, Container, Chip } from "@material-ui/core";
import TopMenu from "../components/TopMenu";
import { Api } from "../api/Api";
import { useParams, useNavigate, Link } from "react-router-dom";
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

const UserEdit = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", password: "", skills: [] });
  const ls = new SecureLS({ encodingType: "aes", isCompression: false });
  const [newSkill, setNewSkill] = useState("");
  const userdata = JSON.parse(ls.get("userData"));

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
  }, [userdata.email]);

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
      const response = await Api.put(`http://localhost:3000/users/${userdata._id}`, user);
      console.log(response);
      alert("Atualizado com sucesso!");
      navigate("/userprofile");
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
            Editar Perfil
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
              disabled 
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
            />
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
              Atualizar
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default UserEdit;
