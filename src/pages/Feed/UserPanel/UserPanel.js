import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserSearchInput from "./UserSearchInput/UserSearchInput";
import UserSearchModal from "./UserSearchModal/UserSearchModal";
const UserPanel = () => {
  // open searching modal, and pass the query to it
  const [SearchModalQuery, setSearchModalQuery] = useState("");

  return (
    <div className="column is-3">
      <div style={{ position: "sticky", top: "80px" }}>
        <UserSearchInput openUserSearchModal={setSearchModalQuery} />
        {!!SearchModalQuery && (
          <UserSearchModal
            query={SearchModalQuery}
            searchUser={setSearchModalQuery}
            close={setSearchModalQuery.bind(this, "")}
          />
        )}
        <div className="columns my-4 is-mobile is-centered box has-background-light mx-0">
          <div
            className="column p-0 is-4"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <figure
              className="image is-64x64 has-background-primary"
              style={{
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              {/* <img [src]="user.img" alt="" /> */}
            </figure>
          </div>
          <div className="column">
            <div>
              <p className="is-size-4 has-text-weight-semibold">username</p>
              <p className="is-size-6 mt-3">email</p>
            </div>
          </div>
        </div>
        <Link
          to="/new-post"
          className="button is-link is-light is-outlined is-fullwidth is-medium"
        >
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span>New Post</span>
        </Link>
      </div>
    </div>
  );
};

export default UserPanel;
