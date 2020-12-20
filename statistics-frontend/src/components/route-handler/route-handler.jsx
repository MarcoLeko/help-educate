import Home from "../app/app";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNotifier from "../shared/app-notifier";
import { Imprint } from "../imprint/imprint";
import { ThemeProvider } from "@material-ui/core/styles";
import { useUiContext } from "../../hooks/use-ui-context";
import getMaterialUiTheme from "../../material-ui-theme";
import { CssBaseline } from "@material-ui/core";

function RouteHandler() {
  const {
    state: { theme },
  } = useUiContext();
  return (
    <ThemeProvider theme={getMaterialUiTheme(theme)}>
      <CssBaseline>
        <Router>
          <AppNotifier />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/imprint" component={Imprint} />
          </Switch>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default RouteHandler;
