import { useData } from "../../contexts/index";
import { PlaylistFolder, Navbar } from "../../components/index";
import { NoVideo } from "../../components/index";
import style from "./playlist.module.css";

export function Playlist() {
  const {
    dataState: { playlistData },
  } = useData();

  return (
    <div className={style.page}>
      <Navbar className={style.navbar} />
      <main className={style.mainContainer}>
        {playlistData.length > 0 ? (
          playlistData.map((playlist) => (
            <PlaylistFolder playlist={playlist} key={playlist._id} />
          ))
        ) : (
          <NoVideo />
        )}
      </main>
    </div>
  );
}
