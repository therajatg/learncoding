import { useEffect } from "react";
import { getHistory } from "../../apiCalls/index";
import { useData, useAuth } from "../../contexts/index";
import { Navbar, NoVideo } from "../../components/index";
import { HistoryCard } from "../../components/index";
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
          {historyData.map((video) => (
            <HistoryCard videoDetail={video} />
          ))}
        </div>
      ) : (
        <NoVideo />
      )}
    </div>
  );
}
