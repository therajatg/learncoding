import style from "./videoCard.module.css";
import { AiFillLike } from "react-icons/ai";
import { BsFillStopwatchFill } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../contexts/dataContext";
import {
  addToWatchLater,
  deleteFromWatchLater,
  addToLiked,
  deleteFromLiked,
  addToHistory,
  deleteItemFromHistory,
} from "../../apiCalls/index";

import { useAuth } from "../../contexts/authContext";

export function VideoCard(prop) {
  const { authState } = useAuth();
  const { token } = authState;
  const { dataState, dataDispatch } = useData();
  const { watchLaterData, likedData, historyData } = dataState;
  const { videoDetail } = prop;
  const { thumbnail, _id } = videoDetail;
  const navigate = useNavigate();

  return (
    <div className={style.videoCard}>
      <Link to={`/tutorial/${_id}`} className={style.thumbnail}>
        <img
          src={thumbnail}
          alt="Thumbnail"
          onClick={() => {
            if (token) {
              if (historyData.find((video) => video._id === _id)) {
                deleteItemFromHistory(_id, token, dataDispatch);
                addToHistory(videoDetail, token, dataDispatch);
              } else {
                addToHistory(videoDetail, token, dataDispatch);
              }
            }
          }}
        />
      </Link>
      <div className={style.videoAction}>
        {token ? (
          watchLaterData.find((video) => video._id === _id) ? (
            <button
              className={style.watchLater}
              onClick={() => deleteFromWatchLater(_id, token, dataDispatch)}
            >
              <BsFillStopwatchFill />
              Remove From Watch Later
            </button>
          ) : (
            <button
              className={style.watchLater}
              onClick={() => addToWatchLater(videoDetail, token, dataDispatch)}
            >
              <BsFillStopwatchFill />
              Watch Later
            </button>
          )
        ) : (
          <button
            className={style.watchLater}
            onClick={() => navigate("/login")}
          >
            <BsFillStopwatchFill />
            Watch Later
          </button>
        )}
        {token ? (
          likedData.find((video) => video._id === _id) ? (
            <button
              className={style.addToLiked}
              onClick={() => deleteFromLiked(_id, token, dataDispatch)}
            >
              <AiFillLike />
              Remove From Liked
            </button>
          ) : (
            <button
              className={style.addToLiked}
              onClick={() => addToLiked(videoDetail, token, dataDispatch)}
            >
              <AiFillLike />
              Add To Liked
            </button>
          )
        ) : (
          <button
            className={style.addToLiked}
            onClick={() => navigate("/login")}
          >
            <AiFillLike />
            Add To Liked
          </button>
        )}
        <button className={style.addToPlaylist}>
          <MdPlaylistAdd />
          Add To Playlist
        </button>
      </div>
    </div>
  );
}
