import Avatar from "../../../shared/components/UIElements/Avatar/Avatar";
import Card from "../../../shared/components/UIElements/Card/Card";
import { Link } from "react-router-dom";
import React from "react";
import "./UserItem.css";

interface ItemProps {
  usersArray: {
    _id: string;
    image: string;
    name: string;
    places: number[] | undefined;
  }[];
}

const UserItem: React.FC<ItemProps> = (props) => {
  return (
    <div className="UserItem">
      {props.usersArray.map((user) => (
        <li className="userItem-li" key={user._id}>
          <Card className="user-item__content">
            <Link to={`/${user._id}/places`}>
              <div className="user-item__image">
                <Avatar {...user} />
              </div>
              <div className="user-item__info" key={user._id}>
                <h2>{user.name}</h2>
                <h3>
                  {user.places?.length === 1 ? "Place " : "Places "}
                  {user.places === undefined || user.places.length === 0
                    ? 0
                    : user.places?.length}
                </h3>
              </div>
            </Link>
          </Card>
        </li>
      ))}
    </div>
  );
};

export default UserItem;
