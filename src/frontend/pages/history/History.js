import { Navbar } from "../../components/index";
import { getHistory } from "../../apiCalls/index";
import { useAuth, useData } from "../../contexts/index";
import { VideoCard } from "../../components/index";
import { useEffect } from "react";

export function History() {
  const { authState } = useAuth();
  const { token } = authState;
  const { dataState, dataDispatch } = useData();
  const { historyData } = dataState;

  useEffect(() => {
    getHistory(token, dataDispatch);
  }, []);

  return (
    <>
      <Navbar />
      {historyData.map((video) => (
        <VideoCard videoDetail={video} />
      ))}
    </>
  );
}
