import style from "./playlistFolder.module.css";
import { Link } from "react-router-dom";
import { useData, useAuth } from "../../contexts/index";
import { deletePlaylist } from "../../apiCalls/index";
import { CgPlayList } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";

export function PlaylistFolder({ playlist }) {
  const { title, _id, videos } = playlist;
  const { authState } = useAuth();
  const { token } = authState;
  const { dataDispatch } = useData();

  return (
    <div className={style.main}>
      <div className={style.card}>
        <Link to={`/playlist/${_id}`}>
          <img src={videos[videos.length - 1].thumbnail} alt="" />
          <div className={style.overlay}>
            {playlist.videos.length}
            <CgPlayList />
          </div>
        </Link>
      </div>
      <div className={style.playlistAction}>
        <span>{title}</span>
        <span onClick={() => deletePlaylist(playlist._id, token, dataDispatch)}>
          <AiFillDelete title="delete playlist" className={style.delete} />
        </span>
      </div>
    </div>
  );
}
