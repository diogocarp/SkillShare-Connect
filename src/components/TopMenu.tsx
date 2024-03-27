import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import SecureLS from "secure-ls";

const TopMenu = () => {
  const ls = new SecureLS({ encodingType: "aes", isCompression: false });
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          SkillShare
        </Typography>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/userregister" color="inherit">
          Registrar
        </Button>
        <Button component={Link} to="/userprofile" color="inherit">
          Perfil
        </Button>
        <Button
          component={Link}
          to="/userlogin"
          color="inherit"
          onClick={() => {
            ls.remove("userdata");
          }}
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;
