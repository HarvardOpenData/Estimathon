import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ScoreboardPage from "../pages/ScoreboardPage";
import AboutPage from "../pages/AboutPage";
import TeamPage from "../pages/TeamPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import Navbar from "./Navbar";
import { theme } from "../theme";
import { ThemeProvider } from "@material-ui/core";
import { AuthProvider } from "../context/AuthContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <Switch>
            <Route exact path={"/"} component={HomePage}/>
            <Route exact path={"/scoreboard"} component={ScoreboardPage}/>
            <Route exact path={"/about"} component={AboutPage}/>
            <Route exact path={"/team"} component={TeamPage}/>
            <Route exact path={"/login"} component={LoginPage}/>
            <Route exact path={"/signup"} component={SignupPage}/>
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
