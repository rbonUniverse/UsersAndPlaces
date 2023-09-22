import React, { ReactNode } from "react";
import "./MainHeader.css";

interface HeaderProps {
  children: ReactNode;
}

const MainHeader: React.FC<HeaderProps> = (props) => {
  return (
    <div className="MainHeader">
      <header className="Header">{props.children}</header>
    </div>
  );
};

export default MainHeader;
