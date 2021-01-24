import React, { useRef, useState } from "react";
import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
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

function SignupPage() {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup, currentUser } = useAuth();
  const history = useHistory();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failedConfirmPass, setFailedConfirmPass] = useState(false);
  const [failedPass, setFailedPass] = useState(false);

  function handleClose() {
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setFailedConfirmPass(false);
    setFailedPass(false);

    if (passwordRef.current.value.length < 6) {
      setFailedPass(true);
    } else if (
      passwordRef.current.value !== passwordConfirmationRef.current.value
    ) {
      setFailedConfirmPass(true);
    } else {
      try {
        setError(false);
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
        history.push("/");
      } catch (e) {
        console.log(e);
        setError(true);
      }

      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      {currentUser.isAnonymous ? (
        <div className={classes.paper}>
          <Dialog open={error} onClose={handleClose}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
              <DialogContentText>Failed to create an account</DialogContentText>
            </DialogContent>
          </Dialog>
          <Typography component="h1" variant="h5">
            Sign Up
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
              error={failedPass}
              helperText={
                failedPass ? "Password is not 6 characters long." : null
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="Password Confirmation"
              type="password"
              id="password confirmation"
              inputRef={passwordConfirmationRef}
              error={failedConfirmPass}
              helperText={
                failedConfirmPass
                  ? "Password confirmation does not match password."
                  : null
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
            <CustomLink to={"/login"}>
              Already have an account? Log In
            </CustomLink>
          </form>
        </div>
      ) : (
        <div>
          You are already logged in. Please sign out before signing up again.
        </div>
      )}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default SignupPage;
