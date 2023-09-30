import React from "react";
import Button from "../../../shared/components/FormElements/Button/Button";
import Card from "../../../shared/components/UIElements/Card/Card";
import PlaceItem from "../PlaceItem/PlaceItem";
import "./PlaceList.css";

interface UsersProps {
  placeItems: {
    _id: string;
    creatorId: string;
    title: string;
    description: string;
    image: string;
    address: string;
    location: { lat: number; lng: number };
  }[];
}

const PlaceList: React.FC<UsersProps> = (props) => {
  return (
    <div className="PlaceList">
      {props.placeItems.length === 0 ? (
        <div className="place-list-center">
          <Card>
            <h2>No Places Found, Maybe Create One ?</h2>
            <Button to="/places/new">Share Place</Button>
          </Card>
        </div>
      ) : (
        <div className="place-list-results">
          <ul className="place-list"></ul>
          <PlaceItem {...props} />
        </div>
      )}
    </div>
  );
};
export default PlaceList;
