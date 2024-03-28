import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, InputBase, makeStyles, Paper, List, ListItem, ListItemText, IconButton } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import SecureLS from "secure-ls";

interface User {
  _id: string;
  id: number;
  username: string;
  email: string;
  password: string;
  skills: string[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.blue,
    '&:hover': {
      backgroundColor: theme.palette.common.blue,
    },
    marginLeft: 0,
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  searchResults: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%", // Definindo a largura para 100%
    maxHeight: 150, // Altura máxima
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    zIndex: 1,
  },
  listItem: {
    cursor: "pointer",
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  blueButton: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
}));

const TopMenu: React.FC = () => {
  const classes = useStyles();
  const ls = new SecureLS({ encodingType: "aes", isCompression: false });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/users/search/${searchTerm}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Failed to fetch search results");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    handleSearch();
  }, [searchTerm]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleLogout = () => {
    ls.remove("userdata");
  };

  const handleBlur = () => {
    setSearchTerm(""); // Limpar o campo de pesquisa
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Typography variant="h6">
          SkillShare
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={handleBlur} // Limpar o campo quando clicar fora
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
          {searchTerm.trim() && (
            <Paper className={classes.searchResults}>
              <List>
                {searchResults.map(user => (
                  <ListItem key={user.id} className={classes.listItem} onClick={() => handleUserClick(user)}>
                    <ListItemText primary={user.username} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </div>
        <div>
          <Button component={Link} to="/" className={classes.blueButton}>
            Home
          </Button>
          <Button component={Link} to="/userprofile" color="inherit">
            Perfil
          </Button>
          <Button component={Link} to="/userlogin" color="inherit" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;
