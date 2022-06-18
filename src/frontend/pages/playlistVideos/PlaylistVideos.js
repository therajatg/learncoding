import { Navbar, VideoCard } from "../../components/index";
import { useData } from "../../contexts/index";
import { useParams } from "react-router-dom";
import style from "../home/home.module.css";

export function PlaylistVideos() {
  const { playlistId } = useParams();
  const {
    dataState: { playlistData },
  } = useData();

  const singlePlaylist = playlistData.find(
    (playlist) => playlist._id === playlistId
  );

  return (
    <div className={style.home}>
      <Navbar className={style.navbar} />
      <main className={style.mainContainer}>
        {singlePlaylist.videos.map((videoDetail) => (
          <VideoCard videoDetail={videoDetail} key={videoDetail._id} />
        ))}
      </main>
    </div>
  );
}
