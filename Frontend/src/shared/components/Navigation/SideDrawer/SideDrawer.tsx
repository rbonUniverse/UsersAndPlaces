import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./SideDrawer.css";

interface SideDrawerProps {
  children: ReactNode;
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  const content = <aside className="side-drawer">{props.children}</aside>;
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
