import axios from "axios";
import { toast } from "react-toastify";

const getWatchLater = async (token, dataDispatch) => {
  try {
    const res = await axios.get("/api/user/watchlater", {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "WATCH_LATER", payload: res.data.watchlater });
  } catch (err) {
    console.log(err);
  }
};

const addToWatchLater = async (video, token, dataDispatch) => {
  try {
    const res = await axios.post(
      "/api/user/watchlater",
      {
        video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dataDispatch({ type: "WATCH_LATER", payload: res.data.watchlater });
    toast.success("Video added to watch later");
  } catch (err) {
    console.log(err);
    toast.error("Error. Please try again later");
  }
};

const deleteFromWatchLater = async (id, token, dataDispatch) => {
  try {
    const res = await axios.delete(`/api/user/watchlater/${id}`, {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "WATCH_LATER", payload: res.data.watchlater });
    toast.success("Video removed from watch later");
  } catch (err) {
    console.log(err);
    toast.error("Error. Please try again later");
  }
};

export { getWatchLater, addToWatchLater, deleteFromWatchLater };
