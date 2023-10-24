import React, { useState, useContext } from "react";
import Button from "../../../shared/components/FormElements/Button/Button";
import Input from "../../../shared/components/FormElements/Input/Input";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/Validators/Validators";
import Card from "../../../shared/components/UIElements/Card/Card";
import AuthContext from "../../../shared/components/context/auth-context";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ImageUpload from "../../../shared/components/FormElements/ImageUpload/ImageUpload";
import "./UserAuth.css";

interface authContextInterface {
  isLoggedIn: boolean;
  userId: string;
  login: (userId: string) => void;
  logout: () => void;
}

interface FormDataInterface {
  append?(name?: string, email?: string, password?: string, image?: File): any;
}

const UserAuth: React.FC<FormDataInterface> = () => {
  const auth: authContextInterface = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, authInputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    true
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined, image: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authLoginHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "POST",
          "http://localhost:5001/api/users/login",
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }
        );

        auth.login(responseData.user._id);
      } catch (err: any) {}
    } else {
      try {
        const formData: FormDataInterface = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          "POST",
          "http://localhost:5001/api/users/signup",
          formData
        );

        auth.login(responseData.user._id);
      } catch (err: any) {}
    }
  };

  return (
    <div className="UserAuth">
      <ErrorModal error={error && error.message} onClear={clearError} />
      <Card className="authentication">
        {isLoading && (
          <div className="center">
            <LoadingSpinner asOverlay />
          </div>
        )}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authLoginHandler}>
          {!isLoginMode && (
            <Input
              _id="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter name"
              onInput={authInputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              _id="image"
              center
              error
              errorText="Please provide an image"
              onInput={authInputHandler}
            />
          )}
          <Input
            _id="email"
            element="input"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid e-mail address"
            onInput={authInputHandler}
          />
          <Input
            _id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MIN(6)]}
            errorText="Please enter a valid password, at list 6 characters"
            onInput={authInputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </div>
  );
};

export default UserAuth;
