import style from "./videoCard.module.css";
import { AiFillLike } from "react-icons/ai";
import { BsFillStopwatchFill } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";

export function VideoCard(prop) {
  const { videoDetail } = prop;
  const { thumbnail, _id } = videoDetail;
  return (
    <div className={style.videoCard}>
      <img src={thumbnail} alt="Thumbnail" className={style.thumbnail} />

      <div className={style.videoAction}>
        <button className={style.watchLater}>
          <BsFillStopwatchFill />
          Watch Later
        </button>
        <button className={style.addToCart}>
          <AiFillLike />
          Add To Liked
        </button>
        <button className={style.addToCart}>
          <MdPlaylistAdd />
          Add To Playlist
        </button>
      </div>
    </div>
  );
}
