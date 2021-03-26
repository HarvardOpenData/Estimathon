import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Input, Typography } from '@material-ui/core';
import useDatabaseRef from "../hooks/useDatabaseRef";
import { useAuth } from "../context/AuthContext";
import app from "../firebase";

function Puzzle({ puzzleId }) {
  const [puzzle, loading] = useDatabaseRef(`/puzzles/${puzzleId}`, true);
  const { user } = useAuth();
  const [guesses, setGuesses] = useState([""]);
  const [incorrect, setIncorrect] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(
    () => {
      if (puzzle) {
        setGuesses(user.guesses && user.guesses[puzzleId] ? user.guesses[puzzleId] : puzzle.passwords.map(e => ""));
        setDisabled(user.guesses && user.guesses[puzzleId] ? user.guesses[puzzleId].every((guess, i) => guess.toLowerCase() === puzzle.passwords[i]) : false);
      }
    },
    [puzzle]
  );

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(event) {
    let newGuesses = [...guesses];
    newGuesses[event.target.name] = event.target.value
    setGuesses(newGuesses);
    setIncorrect(false);
  }

  function checkGuesses() {
    const guessesRef = app.database().ref(`users/${user.id}/guesses`);
    guessesRef.update({
      [puzzleId]: guesses
    });
    const correctGuesses = guesses.every((guess, i) => guess.toLowerCase() === puzzle.passwords[i]);
    setDisabled(correctGuesses);
    setIncorrect(!correctGuesses);
    setOpen(correctGuesses);
  }

  if (loading) {
    return (
      <div>Puzzle is loading!</div>
    )
  } else {
    return (
      <div>
        <Typography variant="h2">{puzzle.header}</Typography>
        <Typography variant="h5">{puzzle.subheader}</Typography>
        {puzzle.src.map((clue, i) => {
          return (
            <Box m={2}>
              {clue.text && <Typography>{i + 1}. {clue.text}</Typography>}
              {clue.caption && (
                <Box textAlign="center" m={4}>
                  <Typography variant="subtitle2">{clue.caption}</Typography>
                </Box>
              )}
              {clue.url && (
                <Box textAlign="center" m={4}>
                  <img src={clue.url} style={{ maxWidth: "100%" }} />
                </Box>
              )}
            </Box>
          )
        })}
        <Box textAlign="center" m={4}>
          {guesses.map((guess, i) => (
            <Box m={1}>
              <Input
                name={i}
                value={guess}
                onChange={handleChange}
                disabled={disabled}
                error={incorrect}
              />
            </Box>
          ))}
          <Button onClick={checkGuesses} disabled={disabled}>Enter</Button>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Congrats on finishing {puzzle.header}!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Feel free onto the next tab to progress through the puzzle hunt!
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              On to the Next!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default Puzzle;