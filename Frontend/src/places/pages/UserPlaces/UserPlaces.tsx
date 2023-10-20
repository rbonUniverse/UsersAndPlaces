import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../../components/PlaceList/PlaceList";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";

interface RouteParams {
  userId: string;
}

const UserPlaces: React.FC = () => {
  const { userId } = useParams<RouteParams>();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const responseData = await sendRequest(
          "GET",
          `http://localhost:5001/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err: any) {}
    };
    fetchUserPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (place_idToDelete: string) => {
    setLoadedPlaces((prevPlaces: any) => {
      return prevPlaces.filter((place: any) => place._id !== place_idToDelete);
    });
  };

  return (
    <>
      <ErrorModal error={error && error.message} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList
          userPlacesArray={loadedPlaces}
          onDeletePlace={placeDeletedHandler}
        />
      )}
      ;
    </>
  );
};
export default UserPlaces;
