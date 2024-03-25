import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const TopMenu = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          SkillShare
        </Typography>
        <Button component={Link} to="/" color="inherit">Home</Button>
        <Button component={Link} to="/userlogin" color="inherit">Login</Button>
        <Button component={Link} to="/userregister" color="inherit">Registrar</Button>
        <Button component={Link} to="/userprofile" color="inherit">Perfil</Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;
