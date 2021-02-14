import React, { useContext, useState } from "react";
import { AxiosInstance } from "../../App";
import AuthContext from "../../AuthContext";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import Input from "../../components/Input/Input";
import Logo from "../../components/Logo/Logo";

const InstructorLogin = ({ history }) => {
  const [IsFormValid, setIsFormValid] = useState(false);
  const [IsBtnLoading, setIsBtnLoading] = useState(false);
  const [Error, setError] = useState("");
  const [Form, setForm] = useState({
    username: {
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
    },
    password: {
      elementType: "input",
      value: "",
      touched: false,
      valid: false,
      validation: {
        required: true,
      },
      elementConfig: {
        type: "text",
        placeholder: "Enter Your Password *",
      },
      errorMsg: "Enter a valid Password ",
    },
  });
  const authState = useContext(AuthContext);
  const checkValidity = (rules, value) => {
    let isValid = true;
    if (rules.required) isValid = value.trim() !== "" && isValid;
    if (rules.maxLength) isValid = value.length < rules.maxLength && isValid;
    return isValid;
  };
  const inputChangeHandler = (identifier, event) => {
    const updateForm = { ...Form };
    const updatedFormElement = {
      ...updateForm[identifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      Form[identifier].validation,
      event.target.value
    );
    updatedFormElement.touched = true;
    updateForm[identifier] = updatedFormElement;
    let formValidity = true;
    for (let item in updateForm)
      if (!updateForm[item].valid) {
        formValidity = false;
        break;
      }
    setIsFormValid(formValidity);
    setForm(updateForm);
  };
  const handleLogin = () => {
    const formdata = new FormData();
    formdata.append("username", Form.username.value);
    formdata.append("password", Form.password.value);
    setIsBtnLoading(true);
    AxiosInstance.post("/get-instructor-token", formdata)
      .then((res) => {
        authState.login(
          res.data.token,
          res.data.username,
          res.data.email,
          true
        );
        history.push("/instructor/workouts");
      })
      .catch((err) => {
        if (err.response.data === "invalid_credentials")
          setError("Invalid Credetials ");
        setIsBtnLoading(false);
      });
  };

  return (
    <div className="section columns is-centered">
      <div className="column is-5">
        <div className="box  has-text-centered">
          <p className="p-3 is-size-4">
            <Logo /> Instructor Login
          </p>
          {!!Error ? <ErrorMsg errMsg={Error} /> : null}
          <div className="box has-background-light">
            {Object.keys(Form).map((item, i) => (
              <Input
                key={i}
                valid={Form[item].valid}
                change={inputChangeHandler.bind(this, item)}
                touched={Form[item].touched}
                value={Form[item].value}
                config={Form[item].elementConfig}
                errorMsg={Form[item].errorMsg}
              />
            ))}
            <button
              onClick={handleLogin}
              className={
                "button is-primary is-fullwidth " +
                (IsBtnLoading ? "is-loading" : "")
              }
              disabled={!IsFormValid}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorLogin;
