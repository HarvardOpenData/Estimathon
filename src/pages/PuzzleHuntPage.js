import React, { useState, useMemo } from 'react';
import Puzzle from '../components/Puzzle';
import { AppBar, Box, Container, Tab, Tabs, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import useDatabaseRef from "../hooks/useDatabaseRef";
import useMultipleDatabaseRefs from "../hooks/useMultipleDatabaseRefs";
import { useAuth } from "../context/AuthContext";
import Finish from '../components/Finish';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function PuzzleHuntPage() {
  const [currentSettings, currentSettingsLoading] = useDatabaseRef(`/current`, true);
  const [bonus, bonusLoading] = useDatabaseRef(
    useMemo(
      () =>
        currentSettings ? `/puzzles/${currentSettings.bonus}` : "",
      [currentSettings]
    ), true);
  const [puzzles, puzzlesLoading] = useMultipleDatabaseRefs(
    useMemo(
      () =>
        currentSettings ? currentSettings.questions.map(puzzleId => `/puzzles/${puzzleId}`) : [],
      [currentSettings]
    )
  );
  const [value, setValue] = useState(0);
  const { user } = useAuth();

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  if (currentSettingsLoading || puzzlesLoading) {
    return (
      <div>Puzzles are loading!</div>
    )
  } else {
    return (
      <Container maxWidth={"lg"}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            centered
          >
            {puzzles.map((puzzle, index) => {
              if (index === 0) {
                return <Tab label={"Puzzle 1"} {...a11yProps(0)} />;
              }
              return <Tab label={`Puzzle ${index + 1}`} {...a11yProps(index)} disabled={!(user.guesses && user.guesses[index - 1] && user.guesses[index - 1].every((guess, i) => guess === puzzles[index - 1].passwords[i]))} />
            })}
            <Tab label="Congrats!" {...a11yProps(3)} disabled={!(user.guesses && user.guesses[2] && user.guesses[2].every((guess, i) => guess === puzzles[2].passwords[i]))} />
            <Tab label="Bonus" {...a11yProps(4)} disabled={!(user.guesses && user.guesses[2] && user.guesses[2].every((guess, i) => guess === puzzles[2].passwords[i]))} />
            {!bonusLoading && <Tab label="Bonus Congrats!" {...a11yProps(5)} disabled={!(user.guesses && user.guesses[3] && user.guesses[3].every((guess, i) => guess === bonus[0].passwords[i]))} />}
          </Tabs>
        </AppBar>
        {currentSettings.questions.map((id, i) => {
          return (
            <TabPanel value={value} index={i}>
              <Puzzle puzzleId={id} />
            </TabPanel>
          )
        })}
        <TabPanel value={value} index={3}>
          <Finish finishId={currentSettings.finish} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Puzzle puzzleId={currentSettings.bonus} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Finish finishId={currentSettings.bonus_finish} />
        </TabPanel>
      </Container>
    )
  }
}

export default PuzzleHuntPage;