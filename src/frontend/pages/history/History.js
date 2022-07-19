import { useEffect } from "react";
import { getHistory, deleteAllHistory } from "../../apiCalls/index";
import { useData, useAuth } from "../../contexts/index";
import { Navbar, NoVideo, VideoCard } from "../../components/index";
// import { HistoryCard } from "../../components/index";
import style from "./history.module.css";

export function History() {
  const { dataState, dataDispatch } = useData();
  const { historyData } = dataState;
  const { authState } = useAuth();
  const { token } = authState;

  useEffect(() => {
    getHistory(token, dataDispatch);
  }, []);

  return (
    <div>
      <Navbar />
      {historyData.length > 0 ? (
        <div className={style.main}>
          <div className={style.videos}>
            {historyData.map((video) => (
              <VideoCard videoDetail={video} key={video._id} />
            ))}
          </div>
          <p
            className={style.clearHistory}
            onClick={() => deleteAllHistory(token, dataDispatch)}
          >
            Clear History
          </p>
        </div>
      ) : (
        <NoVideo />
      )}
    </div>
  );
}
