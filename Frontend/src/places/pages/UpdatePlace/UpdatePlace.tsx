import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../shared/components/FormElements/Button/Button";
import Input from "./../../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "./../../../shared/util/Validators/Validators";
import Card from "../../../shared/components/UIElements/Card/Card";
import { useForm } from "../../../shared/hooks/form-hook";
import "./../PlaceFormCSS/PlaceForm.css";

const DUMMY_PLACES: {
  _id: string;
  creatorId: string;
  title: string;
  description: string;
  image: string;
  address: string;
  location: { lat: number; lng: number };
}[] = [
  {
    _id: "p1",
    creatorId: "u1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the wold",
    image:
      "https://www.esbnyc.com/sites/default/files/styles/small_feature/public/2019-10/home_banner-min.jpg?itok=uZt-03Vw",
    address: "20 W 34th st, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
  },
  {
    _id: "p2",
    creatorId: "u1",
    title: "Romania",
    description: "One of the most famous sky scrapers in the wold",
    image:
      "https://www.esbnyc.com/sites/default/files/styles/small_feature/public/2019-10/home_banner-min.jpg?itok=uZt-03Vw",
    address: "20 W 34th st, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
  },
];

interface RouteParams {
  placeId: string;
}

const UpdatePlace: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { placeId } = useParams<RouteParams>();

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

  const identifiedPlace = DUMMY_PLACES.find((p) => p._id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!!!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="UpdatePlace">
      <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialIsValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialIsValid={formState.inputs.description.isValid}
        />
        <Button type="button" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>
    </div>
  );
};

export default UpdatePlace;
