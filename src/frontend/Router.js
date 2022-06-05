import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/index";
import Mockman from "mockman-js";
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Mockman />} />
    </Routes>
  );
}
