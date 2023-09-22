import React from "react";
import MainNavigation from "./shared/components/Navigation/MainNavigation/MainNavigation";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import Users from "./user/pages/Users";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/" exact component={Users} />
            <Route path="/places/new" exact component={NewPlace} />
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
