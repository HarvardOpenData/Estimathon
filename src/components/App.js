import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { theme } from "../theme";
import { ThemeProvider } from "@material-ui/core";
import { AuthProvider } from "../context/AuthContext";
import PuzzleHuntPage from "../pages/PuzzleHuntPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={HomePage} />
            <Route exact path={"/puzzles"} component={PuzzleHuntPage} />
            <Route>
              <div>Page Not Found</div>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
