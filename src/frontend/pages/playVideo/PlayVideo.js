import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Navbar, RelatedVideos, PlaylistModal } from "../../components/index";
import { AiFillLike } from "react-icons/ai";
import { BsFillStopwatchFill } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { useAuth, useData } from "../../contexts/index";
import {
  addToLiked,
  deleteFromLiked,
  addToWatchLater,
  deleteFromWatchLater,
} from "../../apiCalls/index";
import style from "./PlayVideo.module.css";
import axios from "axios";

export function PlayVideo() {
  const location = useLocation();
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { token } = authState;
  const { dataState, dataDispatch } = useData();
  const { likedData, watchLaterData } = dataState;
  const { videoId } = useParams();
  const [clickedVideo, setClickedVideo] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    (async () => {
      const res1 = await axios.get(`/api/video/${videoId}`);
      setClickedVideo(res1.data.video);
      const res2 = await axios.get("/api/videos");
      setAllVideos(res2.data.videos);
      setRelatedVideos(filterVideos);
    })();
  }, [clickedVideo]);
  const filterVideos = allVideos.filter(
    (video) => video.category === clickedVideo.category
  );

  const isPresentInWatchLater = watchLaterData.find(
    (video) => video._id === clickedVideo._id
  );

  const isPresentInLiked = likedData.find(
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
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          ></iframe>

          <div className={style.videoContent}>
            <p className={style.videoTitle}>{clickedVideo.title}</p>
            <h2 className={style.actions}>
              <BsFillStopwatchFill
                title="Watch Later"
                className={isPresentInWatchLater ? style.present : style.absent}
                onClick={() => {
                  token
                    ? isPresentInWatchLater
                      ? deleteFromWatchLater(
                          clickedVideo._id,
                          token,
                          dataDispatch
                        )
                      : addToWatchLater(clickedVideo, token, dataDispatch)
                    : navigate("/login", { state: { from: location } });
                }}
              />
              <AiFillLike
                title="Like"
                className={isPresentInLiked ? style.present : style.absent}
                onClick={() => {
                  token
                    ? isPresentInLiked
                      ? deleteFromLiked(clickedVideo._id, token, dataDispatch)
                      : addToLiked(clickedVideo, token, dataDispatch)
                    : navigate("/login", { state: { from: location } });
                }}
              />
              <MdPlaylistAdd
                title="Add to Playlist"
                onClick={(e) => {
                  token
                    ? setModal((prev) => !prev)
                    : navigate("/login", { state: { from: location } });
                }}
              />
            </h2>
          </div>
        </div>
        <RelatedVideos relatedVideos={relatedVideos} />
        {modal ? (
          <PlaylistModal setModal={setModal} videoDetail={clickedVideo} />
        ) : null}
      </main>
    </>
  );
}
