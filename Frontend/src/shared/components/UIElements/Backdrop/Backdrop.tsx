import React, { ReactEventHandler } from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

interface BackdropProps {
  onClick: ReactEventHandler;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
