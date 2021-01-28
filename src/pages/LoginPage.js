import React, { useRef, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CustomLink from "../components/CustomLink";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginPage() {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, authUser } = useAuth();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleClose() {
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      setError(false);
      setLoading(true);
      login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      console.log(e);
      setError(true);
    }

    setLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      {authUser.isAnonymous ? (
        <div className={classes.paper}>
          <Dialog open={error} onClose={handleClose}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
              <DialogContentText>Failed to log in</DialogContentText>
            </DialogContent>
          </Dialog>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              inputRef={emailRef}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              inputRef={passwordRef}
              autoComplete="current-password"
            />
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <CustomLink to={"/"}>Forgot password?</CustomLink>
              </Grid>
              <Grid item>
                <CustomLink to={"/signup"}>
                  Don't have an account? Sign Up
                </CustomLink>
              </Grid>
            </Grid>
          </form>
        </div>
      ) : (
        <div>
          You are already logged in. Please sign out before logging in again.
        </div>
      )}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default LoginPage;
