import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import app from "../firebase";
import firebase from "firebase";

function HomePage() {
  const history = useHistory();
  const { user } = useAuth();

  function createGame() {
    const gameRef = app.database().ref("games");
    const newGameRef = gameRef.push();
    newGameRef.set({
      date_created: firebase.database.ServerValue.TIMESTAMP,
      status: "starting",
      teams: [],
      players: [user.id],
    });
    history.push(`/games/${newGameRef.key}`);
  }

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      onClick={createGame}
    >
      Make Game
    </Button>
  );
}

export default HomePage;
