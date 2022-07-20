import "./App.css";
import { Router } from "./frontend/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router />
      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default App;
