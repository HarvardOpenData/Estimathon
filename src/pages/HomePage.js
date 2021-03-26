import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const history = useHistory();
  const { user } = useAuth();

  // function createGame() {
  //   const gameRef = app.database().ref("games");
  //   const newGameRef = gameRef.push();
  //   newGameRef.set({
  //     date_created: firebase.database.ServerValue.TIMESTAMP,
  //     status: "starting",
  //     teams: [],
  //     players: [user.id],
  //   });
  //   history.push(`/games/${newGameRef.key}`);
  // }

  function createGame() {
    history.push(`/puzzles`);
  }

  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
    <Button
      type="submit"
      variant="contained"
      color="primary"
      onClick={createGame}
    >
      Play Puzzle Hunt
    </Button>
    </div>
  );
}

export default HomePage;
