import React, { useState } from "react";

const UserSearchInput = ({ openUserSearchModal }) => {
  const [Query, setQuery] = useState("");
  const handleSubmit = () => {
    openUserSearchModal(Query);
    setQuery("");
  };
  return (
    <div className="field has-addons">
      <div className="control has-icons-left is-expanded">
        <input
          type="text"
          className="input"
          placeholder="search students"
          onChange={(evnt) => {
            setQuery(evnt.target.value);
          }}
          value={Query}
        />
        <span className="icon is-left">
          <i className="fas fa-search"></i>
        </span>
      </div>
      <div className="control">
        <button
          disabled={!!!Query}
          className="button is-link"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default UserSearchInput;
