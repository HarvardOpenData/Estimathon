import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";
import firebase from "firebase";
import { Backdrop, CircularProgress } from "@material-ui/core";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    auth.currentUser.linkWithCredential(credential)
      .then(cred => {
        setLoading(true);
        const user = cred.user;
        console.log("Anonymous account successfully upgraded", user);
      })
      .catch(error => {
        console.log("Error upgrading anonymous account", error);
      });
  }

  function login(email, password) {
    const user = auth.currentUser;
    setLoading(true);
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        user.delete()
          .catch(error => console.log("Error deleting account", error));
      })
      .catch(error => {
        console.log("Error logging in", error);
        setLoading(false);
      });
  }

  function signout() {
    auth.signOut()
      .then(() => {
        console.log("Successfully logged out.");
        setLoading(true);
      })
      .catch(error => console.log("Error logging out", error));
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        // User is signed out.
        setCurrentUser(null);
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            alert("Unable to connect to the server. Please try again later.");
          });
      }
    }));

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    signout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      <Backdrop open={loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </AuthContext.Provider>
  );
}