import style from "./relatedVideos.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth, useData } from "../../contexts/index";
import axios from "axios";

export function RelatedVideos({ relatedVideos }) {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { token } = authState;
  const { dataState, dataDispatch } = useData();
  const { likedData, watchLaterData, historyData } = dataState;
  const [modal, setModal] = useState(false);

  return (
    <div className={style.relatedVideos}>
      {/* <div className={style.relatedVideosTitle}>{clickedVideo.category}</div> */}
      {relatedVideos.map(({ thumbnail, _id, title }) => (
        <Link to={`/tutorial/${_id}`} className={style.thumbnail}>
          <img
            src={thumbnail}
            alt="Thumbnail"
            className={style.thumbnailVideo}
          />
          <p className={style.thumbnailText}>{title}</p>
        </Link>
      ))}
    </div>
  );
}
