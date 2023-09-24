import React, {
  HTMLAttributeAnchorTarget,
  ReactEventHandler,
  ReactNode,
} from "react";
import { Link } from "react-router-dom";

import "./Button.css";

interface ButtonProps {
  children: ReactNode;
  href?: HTMLAttributeAnchorTarget;
  to?: string;
  onClick?: ReactEventHandler;
  inverse?: boolean;
  danger?: boolean;
  size?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || "default"} ${
        props.inverse && "button--inverse"
      } ${props.danger && "button--danger"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
