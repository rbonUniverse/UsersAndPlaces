import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "../../../shared/components/FormElements/Button/Button";
import Input from "./../../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "./../../../shared/util/Validators/Validators";
import { useForm } from "../../../shared/hooks/form-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import Card from "../../../shared/components/UIElements/Card/Card";
import AuthContext from "../../../shared/components/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import "./../PlaceFormCSS/PlaceForm.css";

interface RouteParams {
  placeId: string;
}

interface Place {
  title: string;
  description: string;
}

interface authContextInterface {
  isLoggedIn: boolean;
  userId: string;
  login: (userId: string) => void;
  logout: () => void;
}

const UpdatePlace: React.FC = () => {
  const auth = useContext<authContextInterface>(AuthContext);
  const [placeToUpdate, setPlaceToUpdate] = useState<Place>();
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const { placeId } = useParams<RouteParams>();
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  useEffect(() => {
    const fetchUserPlaceToUpdate = async () => {
      try {
        const response = await sendRequest(
          "GET",
          `http://localhost:5001/api/places/${placeId}`
        );
        const responseData = response.place;
        setPlaceToUpdate(responseData);
        setFormData(
          {
            title: {
              value: responseData.title,
              isValid: true,
            },
            description: {
              value: responseData.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err: any) {}
    };
    fetchUserPlaceToUpdate();
  }, [setFormData, placeId, sendRequest]);

  const placeUpdateSubmitHandler: React.FormEventHandler<
    HTMLFormElement
  > = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "PATCH",
        `http://localhost:5001/api/places/${placeId}`,
        {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }
      );
      history.push(`/${auth.userId}/places`);
    } catch (err: any) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!placeToUpdate && !error && isLoading) {
    return (
      <div className="center">
        <Card>
          <h2>Could Not Find Place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error && error.message} onClear={clearError} />
      {!isLoading && placeToUpdate && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            _id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={placeToUpdate.title}
            initialIsValid={true}
          />
          <Input
            _id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={placeToUpdate.description}
            initialIsValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
