import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../App";
import Loader from "../../../components/Loader/Loader";
import PostCard from "../PostCard/PostCard";

const MainFeed = () => {
  const [FeedData, setFeedData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    AxiosInstance.get("get-user-feed").then((res) => {
      setFeedData(res.data);
      setIsLoading(false);
    });
  }, []);
  let results;
  if (IsLoading) results = <Loader />;
  else if (!!!FeedData.length)
    results = (
      <p className="title is-size-4">
        You Have Not Followed Anyone <br />
        <span className="is-size-6 l-opacity">
          Follow Some People To See Something here
        </span>
      </p>
    );
  else
    results = FeedData.map((item, i) => (
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
