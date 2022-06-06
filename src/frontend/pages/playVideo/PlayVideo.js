import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../../components/index";
import style from "./PlayVideo.module.css";
import axios from "axios";

export function PlayVideo() {
  const { videoId } = useParams();
  const [title, setTitle] = useState("");
  const [relatedVideos, setRelatedVideos] = useState([]);
  useEffect(() => {
    (async () => {
      const res1 = await axios.get(`/api/video/${videoId}`);
      const clickedVideo = res1.data.video;
      setTitle(clickedVideo.title);
      const res2 = await axios.get("/api/videos");
      const allVideos = res2.data.videos;

      setRelatedVideos(
        allVideos.filter((video) => video.category == clickedVideo.category)
      );
      console.log(relatedVideos);
    })();
  }, []);

  return (
    <>
      <Navbar />
      <main className={style.main}>
        <div className={style.playingVideo}>
          <iframe
            width="900"
            height="506"
            src={`https://www.youtube-nocookie.com/embed/${videoId}/?autoplay=1`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowfullscreen
          ></iframe>
          <h2>
            {title} <span>Watch Later</span>
            <span>Like</span>
            <span>Add To Playlist</span>
          </h2>
        </div>

        <div className={style.relatedVideo}>
          {relatedVideos.map(({ _id, thumbnail }) => (
            <Link to={`/tutorial/${_id}`}>
              <img src={thumbnail} className={style.relatedVideo} />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
