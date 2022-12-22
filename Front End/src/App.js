import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import LayoutRoute from "./LayoutRoute";
import LandingPage from "./LandingPage";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import GuestLayoutRoute from "./GuestLayoutRoute";
import PrivateLayoutRoute from "./PrivateLayoutRoute";
import SettingsPage from "./SettingsPage";

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <LayoutRoute path='/' exact={true} component={LandingPage}/>
        <PrivateLayoutRoute path="/settings" exact={true} component={SettingsPage} />
        <GuestLayoutRoute path="/signup" exact={true} component={SignUpPage} />
        <GuestLayoutRoute path="/login" exact={true} component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;