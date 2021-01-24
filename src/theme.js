import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      veryLight: "#FF9586",
      light: "#FF6B61",
      main: "#C63F3F",
      dark: "#961d1d",
      veryDark: "#760000",
    },
    yellow: "#FA9E1C",
    blue: "#78C4D4",
    navy: "#4B5973",
    gray: "#E2DDDB",
    action: {
      hover: "#363636",
    },
    background: {
      panel: "#fafafa",
      paper: "#fff",
      default: "#fafafa",
    },
    success: {
      light: "#81c784",
      main: "#4caf50",
      dark: "#388e3c",
    },
  },
  input: {
    textColor: "black",
    caretColor: "black",
    background: "#fff",
  },
  pie: {
    noGames: "rgba(0, 0, 0, 0.12)",
  },
  alarm: red[700],
  profileTable: {
    row: "#fff",
  },
  setFoundEntry: "rgba(130, 170, 100, 0.15)",
});