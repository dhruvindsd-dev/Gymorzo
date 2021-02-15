import { useEffect, useState } from "react";
import { AxiosInstance, CACHE } from "../App";
// caching with react-router match params and not the api-url since the api-url can be long and hard to delete at differnt places.
const useFetchWithCache = (url, cachePath) => {
  const [State, setState] = useState({
    isLoading: true,
    data: null,
  });
  //    for updating the data, if you wanna filter the data the use it.
  const setData = (data) => {
    CACHE.set(cachePath, data);
    setState({
      ...State,
      data: data,
    });
  };
  useEffect(() => {
    if (CACHE.has(cachePath)) {
      console.log("using cache");
      setState({
        isLoading: false,
        data: CACHE.get(cachePath),
      });
    } else
      AxiosInstance.get(url).then((res) => {
        CACHE.set(cachePath, res.data);
        setState({
          isLoading: false,
          data: res.data,
        });
      });
  }, []);
  return [State.data, State.isLoading, setData];
};

export default useFetchWithCache;
