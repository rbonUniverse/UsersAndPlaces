import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import Button from "../../FormElements/Button/Button";
import "./NavLinks.css";

const NavLinks: React.FC = (props) => {
  const auth = useContext(AuthContext);

  return (
    <div className="NavLinks">
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact>
            ALL USERS
          </NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/u1/places">MY PLACES</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <Button onClick={auth.logout}>LOGOUT</Button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavLinks;
