import React, { useRef, useState } from "react";
import { AxiosInstance, CACHE } from "../../App";

const NewPost = (props) => {
  const [IsBtnLoading, setIsBtnLoading] = useState(false);
  const textAreaRef = useRef(null);

  const handleSubmit = () => {
    const formdata = new FormData();
    // to update the users post in his profile
    CACHE.delete("get-user-profile-initial-load");
    formdata.append("caption", textAreaRef.current.value);
    setIsBtnLoading(true);
    AxiosInstance.post("create-user-post", formdata).then((res) => {
      props.history.push("/feed");
    });
  };
  return (
    <div className="columns is-centered mt-6">
      <div className="column is-5  is-flex is-align-items-center">
        <div className="card" style={{ width: "100%" }}>
          <div className="card-image has-background-primary">
            <figure className="image is-4by3">
              <img src="some dem image " alt="" />
            </figure>
          </div>
          <div className="card-content has-background-light">
            <p className="help is-dark mb-2">Caption Of 100 chracters </p>
            <textarea
              ref={textAreaRef}
              className="textarea"
              rows={4}
              maxLength={100}
            ></textarea>
            <br />
            <button
              onClick={handleSubmit}
              className={
                "button is-link is-light is-outlined " +
                (IsBtnLoading && "is-loading")
              }
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
