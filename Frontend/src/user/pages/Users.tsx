import React from "react";
import UsersList from "../components/UsersList/UsersList";

const USERS: {
  _id: string;
  image: string;
  name: string;
  placeCount: number;
}[] = [
  {
    _id: "u1",
    image:
      "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg",
    name: "ROBBY ZIGI",
    placeCount: 3,
  },
  {
    _id: "u3",
    image:
      "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg",
    name: "PATRICK",
    placeCount: 2,
  },
];

const Users: React.FC = () => {
  return (
    <div className="Users">
      <UsersList userItems={USERS} />
    </div>
  );
};

export default Users;
