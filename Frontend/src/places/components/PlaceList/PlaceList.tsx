import React from "react";
import Button from "../../../shared/components/FormElements/Button/Button";
import Card from "../../../shared/components/UIElements/Card/Card";
import PlaceItem from "../PlaceItem/PlaceItem";
import "./PlaceList.css";

interface UserPlacesProps {
  item: {
    _id: string;
    creatorId: string;
    title: string;
    description: string;
    image: string;
    address: string;
    location: { lat: number; lng: number };
  }[];
  onDeletePlace(_id: string): any;
}

const PlaceList: React.FC<UserPlacesProps> = (props) => {
  return (
    <div className="PlaceList">
      {props.item.length === 0 ? (
        <div className="place-list-center">
          <Card>
            <h2>No Places Found, Maybe Create One ?</h2>
            <Button to="/places/new">Share Place</Button>
          </Card>
        </div>
      ) : (
        <div className="place-list-results">
          <ul className="place-list">
            {props.item.map((place) => (
              <PlaceItem
                key={place._id}
                item={place}
                onDeletePlace={props.onDeletePlace}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default PlaceList;
