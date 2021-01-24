import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Button, IconButton, Toolbar} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();
  const {currentUser, signout} = useAuth();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Button color="inherit" component={Link} to={"/"}>
            Estimathon
          </Button>
          {currentUser.isAnonymous ? (
            <React.Fragment>
              <Button color="inherit" component={Link} to={"/login"}>
                Login
              </Button>
              <Button color="inherit" component={Link} to={"/signup"}>
                Sign Up
              </Button>
            </React.Fragment>
          ) : (<Button color="inherit" onClick={signout}>Sign Out</Button>)}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;