import axios from "axios";

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
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
};

export { getWatchLater, addToWatchLater, deleteFromWatchLater };
