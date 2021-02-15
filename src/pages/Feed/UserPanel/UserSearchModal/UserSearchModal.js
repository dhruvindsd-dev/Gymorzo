import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../App";
import Loader from "../../../../components/Loader/Loader";
import UserSearchInput from "../UserSearchInput/UserSearchInput";
import SearchedUserListItem from "./SearchedUserListItem/SearchedUserListItem";

const UserSearchModal = ({ query, searchUser, close }) => {
  const [IsLoading, setIsLoading] = useState(false);
  const [Results, setResults] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    AxiosInstance.get("search-user", {
      params: {
        query: query,
      },
    }).then((res) => {
      setResults(res.data);
      setIsLoading(false);
    });
  }, [query]);
  let results;
  if (IsLoading) results = <Loader />;
  else if (Results.length === 0)
    results = (
      <p className="is-size-5 has-text-weight-semibold">No Users Found</p>
    );
  else
    results = Results.map((item, i) => (
      <SearchedUserListItem
        username={item.username}
        status={item.status}
        actionType={item.btn_action}
        id={item.id}
        // @ts-ignore
        key={i}
      />
    ));
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Showing results for
            <span className="has-text-weight-semibold">{query}</span>
          </p>
          <button className="delete" onClick={close}></button>
        </header>
        <section className="modal-card-body">
          <UserSearchInput openUserSearchModal={searchUser} />
          <div>{results}</div>
        </section>
        <footer className="modal-card-foot">
          <button
            onClick={close}
            className="button is-link  is-fullwidth is-medium"
          >
            Done
          </button>
        </footer>
      </div>
    </div>
  );
};

export default UserSearchModal;
