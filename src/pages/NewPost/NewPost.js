import React, { useRef, useState } from "react";
import { AxiosInstance } from "../../App";

const NewPost = (props) => {
  const [IsBtnLoading, setIsBtnLoading] = useState(false);
  const textAreaRef = useRef(null);

  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append("caption", textAreaRef.current.value);
    setIsBtnLoading(true);
    AxiosInstance.post("create-user-post", formdata).then((res) => {
      props.history.push("/feed");
    });
  };
  return (
    <div className="columns is-centered">
      <div
        className="column is-5"
        style={{ display: "flex", alignItems: "center", minHeight: "90vh" }}
      >
        <div style={{ flexGrow: "1" }}>
          <div
            className="card"
            style={{
              border: "1px solid grey",
              boxShadow: "3px 3px rgba(136, 134, 134, 0.466)",
              width: "100%`",
            }}
          >
            <div className="card-image has-background-primary">
              <figure className="image is-4by3">
                <img src="some dem image " alt="" />
              </figure>
            </div>
            <div className="card-content has-background-light">
              {/* <p className="title is-4">Usename</p> */}
              {/* <p className="subtitle is-6" contentEditable>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                maiores numquam architecto repellendus iure, omnis totam
                veritatis magni ut sit.
              </p> */}
              <p className="help is-dark mb-2">Caption Of 100 chracters </p>
              <textarea
                ref={textAreaRef}
                className="textarea"
                rows="4"
                maxLength="100"
              ></textarea>
            </div>
          </div>
          <div className="buttons is-centered mt-4">
            <button
              onClick={handleSubmit}
              className={
                "button is-link is-medium is-light is-outlined " +
                (IsBtnLoading && "is-loading")
              }
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
