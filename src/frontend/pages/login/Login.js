import style from "./login.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { useState } from "react";
import { toast } from "react-toastify";

export function Login() {
  const { authState, authDispatch } = useAuth();
  const { user } = authState;
  const [flag, setFlag] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  async function loginHandler(e) {
    console.log(e);
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("token", res.data.encodedToken);
      authDispatch({ type: "TOKEN", payload: res.data.encodedToken });
      toast.success("Login Successful");
      let from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(`${err.response.status} Error. Please try again!`);
    }
  }

  async function guestHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        email: "rajatgupta@gmail.com",
        password: "rajat123",
      });
      localStorage.setItem("token", res.data.encodedToken);
      authDispatch({ type: "TOKEN", payload: res.data.encodedToken });
      toast.success("Login Successful");
      let from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(`${err.response.status} Error. Please try again!`);
    }
  }
  return (
    <div className={style.loginPage}>
      <form
        className={style.form}
        onSubmit={flag ? loginHandler : guestHandler}
      >
        <p className={style.title}>Login to code2BUILD</p>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) =>
              authDispatch({ type: "EMAIL", payload: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) =>
              authDispatch({ type: "PASSWORD", payload: e.target.value })
            }
          />
          <span>Forgot Password?</span>
        </div>
        <button className={style.loginBtn} onClick={() => setFlag(true)}>
          LOGIN
        </button>
        <button className={style.guestLoginBtn} onClick={() => setFlag(false)}>
          Login As Guest
        </button>

        <p className={style.signupLine}>
          Need An Account?{" "}
          <Link to="/signup" className={style.signup}>
            Signup
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
