import React from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";
import "./PlaceItem.css";

interface PlaceItemProps {
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

const PlaceItem: React.FC<PlaceItemProps> = (props) => {
  return (
    <div className="PlaceItem">
      {props.placeItems.map((item) => (
        <li className="place-item" key={item._id}>
          <Card className="place-item__content">
            <div className="place-item__image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="place-item__info">
              <h2>{item.title}</h2>
              <h3>{item.address}</h3>
              <p>{item.description}</p>
            </div>
            <div className="place-item__actions">
              <Button inverse>VIEW ON MAP</Button>
              <Button to={`/places/${item._id}`}>EDIT</Button>
              <Button danger>
                DELETE
              </Button>
            </div>
          </Card>
        </li>
      ))}
    </div>
  );
};
export default PlaceItem;
