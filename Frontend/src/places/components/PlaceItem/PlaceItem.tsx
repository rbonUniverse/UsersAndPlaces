import React, { useState, useContext } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";
import Map from "../../../shared/components/UIElements/Map/Map";
import Modal from "../../../shared/components/UIElements/Modal/Modal";
import AuthContext from "./../../../shared/components/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import "./PlaceItem.css";

interface AuthContextInterface {
  token: boolean;
  userId: string;
}

interface PlaceItemProps {
  item: {
    _id: string;
    creatorId: string;
    title: string;
    description: string;
    image: string;
    address: string;
    location: { lat: number; lng: number };
  };
  onDeletePlace(_id: string): any;
}

const PlaceItem: React.FC<PlaceItemProps> = (props) => {
  const auth = useContext<AuthContextInterface>(AuthContext);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        "DELETE",
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.item._id}`,
        null,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        } as {}
      );
      props.onDeletePlace(props.item._id);
    } catch (err: any) {}
  };

  return (
    <>
      <ErrorModal error={error && error.message} onClear={clearError} />
      <div className="PlaceItem" key={props.item._id}>
        <Modal
          show={showMap}
          onCancel={closeMapHandler}
          header={props.item.address}
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        >
          <div className="map-container">
            <Map center={props.item.location} zoom={16} />
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
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="place-item__image">
              <img
                src={`${process.env.REACT_APP_ASSET_URL}/${props.item.image}`}
                alt={props.item.title}
              />
            </div>
            <div className="place-item__info">
              <h2>{props.item.title}</h2>
              <h3>{props.item.address}</h3>
              <p>{props.item.description}</p>
            </div>
            <div className="place-item__actions">
              <Button inverse onClick={openMapHandler}>
                VIEW ON MAP
              </Button>
              {auth.userId === props.item.creatorId && (
                <Button to={`/places/${props.item._id}`}>EDIT</Button>
              )}
              {auth.userId === props.item.creatorId && (
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              )}
            </div>
          </Card>
        </li>
      </div>
    </>
  );
};
export default PlaceItem;
