import Card from "../../../shared/components/UIElements/Card/Card";
import UserItem from "../UserItem/UserItem";
import React from "react";
import "./UsersList.css";

interface UsersProps {
  userItems: {
    _id: string;
    image: string;
    name: string;
    placeCount: number;
  }[];
}

const UsersList: React.FC<UsersProps> = (props) => {
  return (
    <div className="UsersList">
      {props.userItems.length === 0 ? (
        <div className="Center">
          {
            <Card>
              <h2>No users found</h2>
            </Card>
          }
        </div>
      ) : (
        <ul className="UsersList-ul">
          <UserItem {...props} />
        </ul>
      )}
    </div>
  );
};

export default UsersList;
