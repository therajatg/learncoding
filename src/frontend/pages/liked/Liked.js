import { useEffect } from "react";
import { getLiked } from "../../apiCalls/index";
import { useData, useAuth } from "../../contexts/index";
import { VideoCard } from "../../components/videoCard/VideoCard";

export function Liked() {
  const { dataState, dataDispatch } = useData();
  const { likedData } = dataState;
  const { authState } = useAuth();
  const { token } = authState;

  useEffect(() => {
    getLiked(token, dataDispatch);
  }, []);

  return likedData.map((video) => <VideoCard videoDetail={video} />);
}
