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
import "./UserAuth.css";

const UserAuth: React.FC = () => {
  const auth = useContext(AuthContext);
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
        { ...formState.inputs, name: undefined },
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
        const responseData = await sendRequest(
          "POST",
          "http://localhost:5001/api/users/signup",
          {
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }
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
              id="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter name"
              onInput={authInputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid e-mail address"
            onInput={authInputHandler}
          />
          <Input
            id="password"
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
