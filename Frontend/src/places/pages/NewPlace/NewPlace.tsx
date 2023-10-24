import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/Validators/Validators";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useForm } from "../../../shared/hooks/form-hook";
import AuthContext from "../../../shared/components/context/auth-context";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import "./../PlaceFormCSS/PlaceForm.css";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload/ImageUpload";

interface AuthContextInterface {
  isLoggedIn: boolean;
  userId: string;
  login: (userId: string) => void;
  logout: () => void;
}

interface FormDataInterface {
  append(
    creatorId?: string,
    title?: string,
    description?: string,
    address?: string,
    image?: File
  ): any;
}

const NewPlace: React.FC = () => {
  const auth = useContext<AuthContextInterface>(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const formData: FormDataInterface = new FormData();
      formData.append("creatorId", auth.userId);
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest("POST", "http://localhost:5001/api/places", formData);
      history.push("/");
    } catch (error) {}
  };

  return (
    <div className="NewPlace">
      <ErrorModal error={error && error.message} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          _id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          _id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          _id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          _id="image"
          center
          error
          errorText="Please provide an image"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </div>
  );
};

export default NewPlace;
