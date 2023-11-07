import React, { useState, useEffect } from "react";
import UsersList from "../components/UsersList/UsersList";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users: React.FC = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest(
          "GET",
          `${process.env.REACT_APP_BACKEND_URL}/users`,
          null
        );
        setUsers(response.users);
      } catch (err: any) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <div className="Users">
      <ErrorModal error={error && error.message} onClear={clearError} />
      {isLoading && (
        <div>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && users && <UsersList usersArray={users} />}
    </div>
  );
};

export default Users;
