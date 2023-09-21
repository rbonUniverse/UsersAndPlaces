import React from "react";
import "./Avatar.css";

interface AvatarProps {
  image: string;
  name: string;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div className="Avatar">
      <img src={props.image} alt={props.name} />
    </div>
  );
};

export default Avatar;
