import axios from "axios";
import { toast } from "react-toastify";

const getLiked = async (token, dataDispatch) => {
  try {
    const res = await axios.get("/api/user/likes", {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "LIKED", payload: res.data.likes });
  } catch (err) {
    console.log(err);
  }
};

const addToLiked = async (video, token, dataDispatch) => {
  try {
    const res = await axios.post(
      "/api/user/likes",
      {
        video,
      },
      {
        headers: { authorization: token },
      }
    );
    dataDispatch({ type: "LIKED", payload: res.data.likes });
    toast.success("Video added to liked");
  } catch (err) {
    console.log(err);
    toast.error("Error. Please try again later");
  }
};

const deleteFromLiked = async (id, token, dataDispatch) => {
  try {
    const res = await axios.delete(`/api/user/likes/${id}`, {
      headers: { authorization: token },
    });
    dataDispatch({ type: "LIKED", payload: res.data.likes });
    toast.success("Video removed from liked");
  } catch (err) {
    console.log(err);
    toast.error("Error. Please try again later");
  }
};

export { getLiked, addToLiked, deleteFromLiked };
