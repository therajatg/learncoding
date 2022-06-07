import { useEffect } from "react";
import { getLiked } from "../../apiCalls/index";
import { useData, useAuth } from "../../contexts/index";
import { Navbar, NoVideo } from "../../components/index";
import { VideoCard } from "../../components/videoCard/VideoCard";
import style from "./liked.module.css";

export function Liked() {
  const { dataState, dataDispatch } = useData();
  const { likedData } = dataState;
  const { authState } = useAuth();
  const { token } = authState;

  useEffect(() => {
    getLiked(token, dataDispatch);
  }, []);

  return (
    <div>
      <Navbar />
      {likedData.length > 0 ? (
        <div className={style.main}>
          {likedData.map((video) => (
            <VideoCard videoDetail={video} />
          ))}
        </div>
      ) : (
        <NoVideo />
      )}
    </div>
  );
}
