import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";
import { AxiosInstance } from "../../../App";
import AuthContext from "../../../AuthContext";
import ErrorMsg from "../../../components/ErrorMsg/ErrorMsg";
import Input from "../../../components/Input/Input";
const InputList = (props) => {
  // show only email and password when props.issignup === false ...
  const [IsFormValid, setIsFormValid] = useState(false);
  const [FormState, setFormState] = useState({});
  const [Error, setError] = useState("");
  const [IsBtnLoading, setIsBtnLoading] = useState(false);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    const form = {};
    form.username = {
      elementType: "input",
      value: "",
      touched: false,
      valid: false,
      validation: {
        required: true,
      },
      elementConfig: {
        type: "text",
        placeholder: "Enter Your Username *",
      },
      errorMsg: "Enter a valid username ",
    };
    form.password = {
      elementType: "input",
      value: "",
      touched: false,
      valid: false,
      validation: {
        required: true,
      },
      elementConfig: {
        type: "password",
        placeholder: "Enter Your Password *",
      },
      errorMsg: "Enter a valid password",
    };
    if (props.isSignUp) {
      form.email = {
        elementType: "input",
        value: "",
        touched: false,
        valid: false,
        validation: {
          required: true,
        },
        elementConfig: {
          type: "email",
          placeholder: "Enter Your Email Address *",
        },
        errorMsg: "Enter valid Email",
      };
    }
    // resetting the form when changing routes, aka when the component gets reset
    // for (let item in FormState) {
    //   form[item].value = "";
    // }
    setFormState(form);
    setIsFormValid(false);
    setError("");
  }, [props.isSignUp]);

  const checkValidity = (rules, value) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length < rules.maxLength && isValid;
    }
    return isValid;
  };
  const inputChangeHandler = (identifier, event) => {
    const updateForm = { ...FormState };
    const updatedFormElement = {
      ...updateForm[identifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      FormState[identifier].validation,
      event.target.value
    );
    updatedFormElement.touched = true;
    updateForm[identifier] = updatedFormElement;

    let formValidity = true;
    for (let item in updateForm) {
      if (!updateForm[item].valid) {
        formValidity = false;
        break;
      }
    }
    setIsFormValid(formValidity);
    setFormState(updateForm);
  };
  const handleOnSubmit = () => {
    let url = "get-token";
    const formData = new FormData();
    for (let i in FormState) {
      formData.append(i, FormState[i].value);
    }
    if (props.isSignUp) url = "sign-up";
    setIsBtnLoading(true);
    AxiosInstance.post(url, formData)
      .then((response) => {
        // @ts-ignore
        authContext.login(
          response.data.token,
          response.data.username,
          response.data.email
        );
        props.history.push("/workouts/pending");
      })
      .catch((error) => {
        if (error.response.data === "user_exists")
          setError("User Aldready Exixts. Create A New Username");
        else setError("Invalid Credentials");
        setIsBtnLoading(false);
      });
  };
  let error = null;
  if (!!Error) error = <ErrorMsg errMsg={Error} />;
  return (
    <div>
      {error}
      {Object.keys(FormState).map((item, i) => (
        <Input
          key={i}
          valid={FormState[item].valid}
          change={inputChangeHandler.bind(this, item)}
          touched={FormState[item].touched}
          value={FormState[item].value}
          config={FormState[item].elementConfig}
          errorMsg={FormState[item].errorMsg}
        />
      ))}
      <button
        disabled={!IsFormValid}
        onClick={handleOnSubmit}
        className={
          "button is-medium is-fullwidth is-primary " +
          (IsBtnLoading ? "is-loading" : "")
        }
      >
        Proceed
      </button>
    </div>
  );
};

export default withRouter(InputList);
