import React, { useState } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";
import Map from "../../../shared/components/UIElements/Map/Map";
import Modal from "../../../shared/components/UIElements/Modal/Modal";
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
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  return (
    <>
      {props.placeItems.map((item) => (
        <div className="PlaceItem" key={item._id}>
          <Modal
            show={showMap}
            onCancel={closeMapHandler}
            header={item.address}
            contentClass="place-item__modal-content"
            footerClass="place-item__modal-actions"
            footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
          >
            <div className="map-container">
              <Map center={item.location} zoom={16} />
            </div>
          </Modal>

          <li className="place-item">
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
                <Button inverse onClick={openMapHandler}>
                  VIEW ON MAP
                </Button>
                <Button to={`/places/${item._id}`}>EDIT</Button>
                <Button danger>DELETE</Button>
              </div>
            </Card>
          </li>
        </div>
      ))}
    </>
  );
};
export default PlaceItem;
