import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, Container } from '@material-ui/core';
import TopMenu from '../components/TopMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SecureLS from 'secure-ls';

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

const PostCreate = () => {

    const ls = new SecureLS({ encodingType: 'aes', isCompression: false });
    const userdata = JSON.parse(ls.get('userData'));

    const [post, setPost] = useState({
    username: userdata.username,
    date: Date(),
    title: '',
    description: '',
    image: ''
  });
  const classes = useStyles();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const onFinish = async (e) => {
    e.preventDefault(); 
    try {
        await axios.post('http://localhost:3000/posts', post);
        alert('Post criado com sucesso!');
        navigate('/feed');
    } catch (error) {
        console.log(error);
        alert('Erro ao criar post. Tente novamente.');
    }
  };

  return (
    <>
    <TopMenu/>
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Typography component="h1" variant="h5">
          Criar Post
        </Typography>
        <form className={classes.form} onSubmit={onFinish}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Título"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Descrição"
            multiline
            rows={4}
            value={post.description}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="image"
            label="URL das Imagens"
            value={post.image}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Criar Post
          </Button>
        </form>
      </div>
    </Container>
    </>
  );
};

export default PostCreate;
