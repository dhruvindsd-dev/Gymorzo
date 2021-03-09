import React from "react";
import { useForm } from "react-hook-form";

export default function HookForm({ isSignUp = false }) {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="this is a test"
          ref={register({ required: true })}
        />
        <button type="submit" className="button">
          click me !!!
        </button>
      </form>
    </div>
  );
}
