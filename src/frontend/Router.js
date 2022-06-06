import { Routes, Route } from "react-router-dom";
import {
  Home,
  Signup,
  Login,
  History,
  WatchLater,
  Liked,
  Playlist,
  ErrorPage,
  PlayVideo,
} from "./pages/index";
import Mockman from "mockman-js";
import { RequiresAuth } from "./RequiresAuth";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/history"
        element={
          <RequiresAuth>
            <History />
          </RequiresAuth>
        }
      />
      <Route
        path="/watchLater"
        element={
          <RequiresAuth>
            <WatchLater />
          </RequiresAuth>
        }
      />
      <Route
        path="/liked"
        element={
          <RequiresAuth>
            <Liked />
          </RequiresAuth>
        }
      />
      <Route
        path="/watch-later"
        element={
          <RequiresAuth>
            <Playlist />
          </RequiresAuth>
        }
      />
      <Route path="/tutorial/:videoId" element={<PlayVideo />}></Route>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/test" element={<Mockman />} />
    </Routes>
  );
}
