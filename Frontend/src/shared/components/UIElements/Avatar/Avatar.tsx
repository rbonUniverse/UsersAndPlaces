import React from "react";
import "./Avatar.css";

interface AvatarProps {
  image: string;
  name: string;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div className="Avatar">
      <img
        src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
        alt={props.name}
      />
    </div>
  );
};

export default Avatar;
