import React, { useMemo } from "react";
import useDatabaseRef from "../hooks/useDatabaseRef";
import { Backdrop, CircularProgress } from "@material-ui/core";
import useMultipleDatabaseRefs from "../hooks/useMultipleDatabaseRefs";

function GamePage({ match }) {
  const [game, gameLoading] = useDatabaseRef(`/games/${match.params.id}`);

  const playerIds = useMemo(() => (gameLoading ? [] : game.players), [
    game,
    gameLoading,
  ]);

  console.log(playerIds);

  const [players, playersLoading] = useMultipleDatabaseRefs(
    useMemo(() => playerIds.map((player) => `/users/${player}`), [playerIds])
  );

  console.log(players);

  if (gameLoading || playersLoading) {
    return (
      <Backdrop open={gameLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div>
      <div>{players.map((player) => player.username)}</div>
      <div>{game.date_created}</div>
    </div>
  );
}

export default GamePage;
