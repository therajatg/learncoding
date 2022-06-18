import axios from "axios";

const getAllPlaylists = async (token, dataDispatch) => {
  try {
    const res = await axios.get("/api/user/playlists", {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "PLAYLIST", payload: res.data.playlists });
  } catch (err) {
    console.log(err);
  }
};

const getPlaylist = async (playlistId, token) => {
  try {
    const res = await axios.get(`/api/user/playlists/${playlistId}`, {
      headers: {
        authorization: token,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const addNewPlaylist = async (playlistTitle, token, dataDispatch) => {
  try {
    const res = await axios.post(
      "/api/user/playlists",
      {
        playlist: { title: playlistTitle, description: "bar bar bar" },
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dataDispatch({ type: "PLAYLIST", payload: res.data.playlists });
  } catch (err) {
    console.log(err);
  }
};

const addVideoToPlaylist = async (playlistId, video, token, dataDispatch) => {
  try {
    const res = await axios.post(
      `/api/user/playlists/${playlistId}`,
      {
        video,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dataDispatch({ type: "SINGLE_PLAYLIST", payload: res.data.playlist });
  } catch (err) {
    console.log(err);
  }
};

const deletePlaylist = async (playlistId, token, dataDispatch) => {
  try {
    const res = await axios.delete(`/api/user/playlists/${playlistId}`, {
      headers: {
        authorization: token,
      },
    });
    dataDispatch({ type: "PLAYLIST", payload: res.data.playlists });
  } catch (err) {
    console.log(err);
  }
};

const deleteVideoFromPlaylist = async (
  playlistId,
  videoId,
  token,
  dataDispatch
) => {
  try {
    const res = await axios.delete(
      `/api/user/playlists/${playlistId}/${videoId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    dataDispatch({ type: "SINGLE_PLAYLIST", payload: res.data.playlist });
  } catch (err) {
    console.log(err);
  }
};

export {
  getAllPlaylists,
  getPlaylist,
  addNewPlaylist,
  addVideoToPlaylist,
  deletePlaylist,
  deleteVideoFromPlaylist,
};
