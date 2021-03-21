import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { AxiosInstance } from "../../../App";
import AuthContext from "../../../AuthContext";
import ErrorMsg from "../../../components/ErrorMsg/ErrorMsg";

export default function HookForm({ isSignUp = false }) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [IsBtnLoading, setIsBtnLoading] = useState(false);
  const [Error, setError] = useState("");
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const onSubmit = (data) => {
    let url = "get-token";
    // const formData = new FormData();
    // for (let i in data) {
    //   formData.append(i, data[i]);
    // }
    if (isSignUp) url = "sign-up";
    setIsBtnLoading(true);
    AxiosInstance.post(url, {
      ...data,
    })
      .then((response) => {
        // @ts-ignore
        authContext.login(
          response.data.token,
          response.data.username,
          response.data.email
        );
        history.push("/workouts/pending");
      })
      .catch((error) => {
        if (error.response.data === "user_exists")
          setError("User Aldready Exixts. Create A New Username");
        else setError("Invalid Credentials");
        setIsBtnLoading(false);
      });
  };
  return (
    <div>
      {Error && <ErrorMsg errMsg={Error} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSignUp && (
          <Input
            inputRef={register({
              required: true,
              minLength: 6,
              pattern: /\S+@\S+\.\S+/,
            })}
            placeholder="Email"
            errorMsg="Invalid Email"
            name="email"
            error={errors.email}
          />
        )}
        <Input
          inputRef={register({ required: true })}
          errorMsg="Invalid User"
          name="username"
          error={errors.username}
          placeholder="Username"
        />
        <Input
          inputRef={register({ required: true })}
          errorMsg="Invalid Password"
          name="password"
          error={errors.password}
          placeholder="Password"
          type="password"
        />
        <button
          type="submit"
          className="button is-fullwidth is-primary is-medium"
        >
          Proceed
        </button>
      </form>
    </div>
  );
}
const Input = ({
  inputRef,
  errorMsg,
  name,
  error,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="field">
      <div className="control">
        <input
          type={type}
          ref={inputRef}
          className="input"
          name={name}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="is-danger help has-text-left">{errorMsg}</p>}
    </div>
  );
};
