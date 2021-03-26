import React from "react";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function PaperContainer(props) {
  const classes = useStyles();

  return <Paper className={classes.paper}>{props.children}</Paper>;
}

export default PaperContainer;
