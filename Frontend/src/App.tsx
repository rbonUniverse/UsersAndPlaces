import React, { Suspense } from "react";
import MainNavigation from "./shared/components/Navigation/MainNavigation/MainNavigation";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AuthContext from "./shared/components/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";
import "./App.css";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner/LoadingSpinner";

const NewPlace = React.lazy(() => import("./places/pages/NewPlace/NewPlace"));
const Users = React.lazy(() => import("./user/pages/Users"));
const UserPlaces = React.lazy(
  () => import("./places/pages/UserPlaces/UserPlaces")
);
const UpdatePlace = React.lazy(
  () => import("./places/pages/UpdatePlace/UpdatePlace")
);
const UserAuth = React.lazy(() => import("./user/pages/UserAuth/UserAuth"));

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
          <main>
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner asOverlay />
                </div>
              }
            >
              {routes}
            </Suspense>
          </main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
