import { useData } from "../../contexts/index";
import { PlaylistFolder } from "../../components/index";
import { Navbar } from "../../components/index";
import style from "./playlist.module.css";

export function Playlist() {
  const {
    dataState: { playlistData },
  } = useData();

  return (
    <div className={style.page}>
      <Navbar className={style.navbar} />
      <main className={style.mainContainer}>
        {playlistData.map((playlist) => (
          <PlaylistFolder playlist={playlist} key={playlist._id} />
        ))}
      </main>
    </div>
  );
}
