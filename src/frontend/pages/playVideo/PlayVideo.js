import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../../components/index";
import { AiFillLike } from "react-icons/ai";
import { BsFillStopwatchFill } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { useAuth, useData } from "../../contexts/index";
import {
  addToLiked,
  deleteFromLiked,
  addToWatchLater,
  deleteFromWatchLater,
  addToHistory,
  deleteItemFromHistory,
} from "../../apiCalls/index";
import style from "./PlayVideo.module.css";
import axios from "axios";

export function PlayVideo() {
  const { authState } = useAuth();
  const { token } = authState;
  const { dataState, dataDispatch } = useData();
  const { historyData, likedData, watchLaterData } = dataState;
  const { videoId } = useParams();
  const [clickedVideo, setClickedVideo] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const res1 = await axios.get(`/api/video/${videoId}`);
      setClickedVideo(res1.data.video);
      const res2 = await axios.get("/api/videos");
      const allVideos = res2.data.videos;

      setRelatedVideos(
        allVideos.filter((video) => video.category === clickedVideo.category)
      );
    })();
  }, []);

  const isPresentInWatchLater = watchLaterData.find(
    (video) => video._id === clickedVideo._id
  );

  return (
    <>
      <Navbar />
      <main className={style.main}>
        <div className={style.playingVideo}>
          <iframe
            width="900"
            height="506"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowfullscreen
          ></iframe>

          <div className={style.videoContent}>
            <p className={style.videoTitle}>{clickedVideo.title}</p>
            <h2 className={style.actions}>
              <BsFillStopwatchFill
                title="Watch Later"
                className={`isPresentInWatchLater ? ${style.present} : ${style.absent}`}
                onClick={() => {
                  isPresentInWatchLater
                    ? deleteFromWatchLater(
                        clickedVideo._id,
                        token,
                        dataDispatch
                      )
                    : addToWatchLater(clickedVideo, token, dataDispatch);
                }}
              />
              <AiFillLike title="Like" />
              <MdPlaylistAdd title="Add to Playlist" />
            </h2>
          </div>
        </div>

        <div className={style.relatedVideos}>
          {relatedVideos.map((videoDetail) => (
            <Link to={`/tutorial/${videoDetail._id}`}>
              <img
                src={videoDetail.thumbnail}
                className={style.relatedVideo}
                onClick={() => {
                  if (
                    historyData.find((video) => video._id === videoDetail._id)
                  ) {
                    deleteItemFromHistory(videoDetail._id, token, dataDispatch);
                    addToHistory(videoDetail, token, dataDispatch);
                  } else {
                    addToHistory(videoDetail, token, dataDispatch);
                  }
                }}
              />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
