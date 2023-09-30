import React, { useState, useContext } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";
import Map from "../../../shared/components/UIElements/Map/Map";
import Modal from "../../../shared/components/UIElements/Modal/Modal";
import AuthContext from "./../../../shared/components/context/auth-context";
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING...");
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
          <Modal
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Are you sure?"
            footerClass="place-item__modal-actions"
            footer={
              <>
                <Button inverse onClick={cancelDeleteHandler}>
                  CANCEL
                </Button>
                <Button danger onClick={confirmDeleteHandler}>
                  DELETE
                </Button>
              </>
            }
          >
            <p>
              Do you want to proceed and delete this place ? This action can not
              be undone!!!
            </p>
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
                {auth.isLoggedIn && (
                  <Button to={`/places/${item._id}`}>EDIT</Button>
                )}
                {auth.isLoggedIn && (
                  <Button danger onClick={showDeleteWarningHandler}>
                    DELETE
                  </Button>
                )}
              </div>
            </Card>
          </li>
        </div>
      ))}
    </>
  );
};
export default PlaceItem;
