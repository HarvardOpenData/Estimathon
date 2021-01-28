import React, { useContext, useEffect, useState } from "react";
import app, { auth } from "../firebase.js";
import firebase from "firebase";
import generate from "project-name-generator";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const classes = useStyles();
  const [authUser, setAuthUser] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    setLoading(true);
    auth.currentUser
      .linkWithCredential(credential)
      .then((cred) => {
        const user = cred.user;
        setLoading(false);
        app
          .database()
          .ref("/users/" + user.uid)
          .update({
            email: user.email,
          });
        console.log("Anonymous account successfully upgraded", user);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error upgrading anonymous account", error);
      });
  }

  function login(email, password) {
    const user = auth.currentUser;
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        user
          .delete()
          .catch((error) => console.log("Error deleting account", error));
        app
          .database()
          .ref("/users/" + user.uid)
          .remove();
      })
      .catch((error) => {
        console.log("Error logging in", error);
        setLoading(false);
      });
  }

  function signout() {
    auth
      .signOut()
      .then(() => {
        console.log("Successfully logged out.");
        setLoading(true);
      })
      .catch((error) => console.log("Error logging out", error));
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        // User is signed out.
        setAuthUser(null);
        auth
          .signInAnonymously()
          .then((cred) => {
            const userId = cred.user.uid;
            app
              .database()
              .ref("/users/" + userId)
              .set({
                username: generate().spaced,
                date_created: firebase.database.ServerValue.TIMESTAMP,
              });
          })
          .catch(() => {
            alert("Unable to connect to the server. Please try again later.");
          });
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!authUser) {
      setUser(null);
      return;
    }
    const userRef = firebase.database().ref(`/users/${authUser.uid}`);

    function update(snapshot) {
      setUser({
        ...snapshot.val(),
        id: authUser.uid,
      });
      setLoading(false);
    }

    userRef.on("value", update);
    return () => {
      userRef.off("value", update);
    };
  }, [authUser]);

  const value = {
    authUser,
    user,
    signup,
    login,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </AuthContext.Provider>
  );
}
