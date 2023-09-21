import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import Users from "./user/pages/Users";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
          <Route path="/" exact component={Users} />
          <Route path="/places/new" exact component={NewPlace} />
      </Router>
    </div>
  );
};

export default App;
