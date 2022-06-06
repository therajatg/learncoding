import { useEffect } from "react";
import { getWatchLater } from "../../apiCalls/index";
import { useData, useAuth } from "../../contexts/index";

import { VideoCard } from "../../components/videoCard/VideoCard";

export function WatchLater() {
  const { dataState, dataDispatch } = useData();
  const { watchLaterData } = dataState;
  const { authState } = useAuth();
  const { token } = authState;

  useEffect(() => {
    getWatchLater(token, dataDispatch);
  }, []);

  return watchLaterData.map((video) => <VideoCard videoDetail={video} />);
}
