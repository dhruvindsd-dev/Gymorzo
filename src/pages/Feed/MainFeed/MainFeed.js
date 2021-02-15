import React from "react";
import Loader from "../../../components/Loader/Loader";
import useFetchWithCache from "../../../Hooks/fetchWithCache";
import PostCard from "../PostCard/PostCard";

const MainFeed = () => {
  const [data, isLoading] = useFetchWithCache("/get-user-feed", "/feed");
  console.log(data, isLoading);
  let results;
  if (isLoading) results = <Loader />;
  else if (data === "no_followers")
    results = (
      <p className="title is-sizez-4">
        You Have Not Followed Anyone <br />
        <span className="is-size-6 l-opacity">
          Follow Some People To See Something here
        </span>
      </p>
    );
  else if (!!!data.length)
    results = (
      <p className="title is-5 has-text-centered p-6">
        <p className="is-size-1">\(o_o)/</p> <br />
        Nothing found. Follow some more people
      </p>
    );
  else
    results = data.map((item, i) => (
      <PostCard
        date={item.date}
        username={item.user}
        caption={item.caption}
        key={i}
      />
    ));
  return <div className="column is-5">{results}</div>;
};

export default MainFeed;
