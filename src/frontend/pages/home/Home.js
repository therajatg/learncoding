import { Navbar, VideoCard } from "../../components/index";
import { useEffect, useState } from "react";
import style from "./home.module.css";
import axios from "axios";

export function Home() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/videos");
      setVideos(res.data.videos);
      console.log(videos);
    })();
  }, []);
  return (
    <div className={style.home}>
      <Navbar className={style.navbar} />
      <main className={style.mainContainer}>
        {videos.map((videoDetail) => (
          <VideoCard videoDetail={videoDetail} key={videoDetail._id} />
        ))}
      </main>
    </div>
  );
}
