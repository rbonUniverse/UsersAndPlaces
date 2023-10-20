import Card from "../../../shared/components/UIElements/Card/Card";
import UserItem from "../UserItem/UserItem";
import React from "react";
import "./UsersList.css";

interface UsersProps {
  usersArray: {
    _id: string;
    image: string;
    name: string;
    places: number[];
  }[];
}

const UsersList: React.FC<UsersProps> = (props) => {
  return (
    <div className="UsersList">
      <div className="Center">
        {props.usersArray.length === 0 ? (
          <Card>
            <h2>No Users Found</h2>
          </Card>
        ) : (
          <ul className="UsersList-ul">
            <UserItem {...props} />
          </ul>
        )}
      </div>
    </div>
  );
};

export default UsersList;
