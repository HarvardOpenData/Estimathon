import React from "react";
import {
  Backdrop,
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import useDatabaseRef from "../hooks/useDatabaseRef";

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function ProfilePage({ match }) {
  const classes = useStyles();
  const [user, loading] = useDatabaseRef(`/users/${match.params.id}`, true);

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
      </div>
      <div>{user.username}</div>
      <div>{user.email}</div>
    </Container>
  );
}

export default ProfilePage;
