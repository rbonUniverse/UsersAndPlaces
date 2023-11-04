import React from "react";
import MainNavigation from "./shared/components/Navigation/MainNavigation/MainNavigation";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace/NewPlace";
import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace/UpdatePlace";
import UserAuth from "./user/pages/UserAuth/UserAuth";
import AuthContext from "./shared/components/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";
import "./App.css";

const App: React.FC = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/places" exact component={UserPlaces} />
        <Route path="/places/new" exact component={NewPlace} />
        <Route path="/places/:placeId" exact component={UpdatePlace} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userId/places" exact component={UserPlaces} />
        <Route path="/auth" exact component={UserAuth} />
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          loginAndSignUp: login,
          logout: logout,
          userId: userId,
        }}
      >
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
