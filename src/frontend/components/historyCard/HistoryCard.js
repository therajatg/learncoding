import styles from "../videoCard/videoCard.module.css";
import { AiFillLike } from "react-icons/ai";
import { BsFillStopwatchFill } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { Link } from "react-router-dom";
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

export function HistoryCard(prop) {
  const { authState } = useAuth();
  const { token } = authState;
  const { dataState, dataDispatch } = useData();
  const { watchLaterData, likedData, historyData } = dataState;
  const { videoDetail } = prop;
  const { thumbnail, _id } = videoDetail;

  return (
    <div className={styles.videoCard}>
      <Link to={`/tutorial/${_id}`} className={styles.thumbnail}>
        <img
          src={thumbnail}
          alt="Thumbnail"
          onClick={() => {
            if (historyData.find((video) => video._id === _id)) {
              deleteItemFromHistory(_id, token, dataDispatch);
              addToHistory(videoDetail, token, dataDispatch);
            } else {
              addToHistory(videoDetail, token, dataDispatch);
            }
          }}
        />
      </Link>
      <div className={styles.videoAction}>
        {watchLaterData.find((video) => video._id === _id) ? (
          <button
            className={styles.watchLater}
            onClick={() => deleteFromWatchLater(_id, token, dataDispatch)}
          >
            <BsFillStopwatchFill />
            Remove From Watch Later
          </button>
        ) : (
          <button
            className={styles.watchLater}
            onClick={() => addToWatchLater(videoDetail, token, dataDispatch)}
          >
            <BsFillStopwatchFill />
            Watch Later
          </button>
        )}

        {likedData.find((video) => video._id === _id) ? (
          <button
            className={styles.addToLiked}
            onClick={() => deleteFromLiked(_id, token, dataDispatch)}
          >
            <AiFillLike />
            Remove From Liked
          </button>
        ) : (
          <button
            className={styles.addToLiked}
            onClick={() => addToLiked(videoDetail, token, dataDispatch)}
          >
            <AiFillLike />
            Add To Liked
          </button>
        )}

        <button className={styles.addToPlaylist}>
          <MdPlaylistAdd />
          Add To Playlist
        </button>
        <button onClick={() => deleteItemFromHistory(_id, token, dataDispatch)}>
          Remove From History
        </button>
      </div>
    </div>
  );
}
