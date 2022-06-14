import axios from "axios";

const getHistory = async (token, dataDispatch) => {
  try {
    const res = await axios.get("/api/user/history", {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "HISTORY", payload: res.data.history });
  } catch (err) {
    console.log(err);
  }
};

const addToHistory = async (video, token, dataDispatch) => {
  try {
    const res = await axios.post(
      "/api/user/history",
      { video },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dataDispatch({ type: "HISTORY", payload: res.data.history });
  } catch (err) {
    console.log(err);
  }
};

const deleteItemFromHistory = async (id, token, dataDispatch) => {
  try {
    const res = await axios.delete(`/api/user/history/${id}`, {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "HISTORY", payload: res.data.history });
  } catch (err) {
    console.log(err);
  }
};

const deleteAllHistory = async (token, dataDispatch) => {
  try {
    const res = await axios.delete("/api/user/history/all", {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "HISTORY", payload: res.data.history });
  } catch (err) {
    console.log(err);
  }
};

export { getHistory, addToHistory, deleteItemFromHistory, deleteAllHistory };
