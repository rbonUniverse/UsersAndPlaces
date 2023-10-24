import React, { useReducer, useEffect, HTMLInputTypeAttribute } from "react";
import { validate } from "../../../../shared/util/Validators/Validators";
import "./Input.css";

interface Validator {
  type: string;
  val?: number | string | boolean;
}

interface InputProps {
  _id?: string;
  label?: string;
  initialValue?: string;
  initialIsValid?: boolean;
  element?: "input" | "textarea";
  rows?: number;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  errorText?: string;
  validators?: Validator[];
  onInput?: (_id: string | undefined, value: string, isValid: boolean) => void;
}

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input: React.FC<InputProps> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialIsValid || false,
  });

  const { _id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(_id, value, isValid);
  }, [_id, value, isValid, onInput]);

  const changeHandler: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props._id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props._id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props._id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
