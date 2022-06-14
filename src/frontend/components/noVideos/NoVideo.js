import style from "./noVideo.module.css";
import { Link } from "react-router-dom";

export function NoVideo() {
  return (
    <div className={style.main}>
      <h2>You do not have any videos here</h2>
      <Link to="/" className={style.exploreLink}>
        Explore Videos
      </Link>
    </div>
  );
}
