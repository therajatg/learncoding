import style from "./login.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { useState } from "react";

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
      let from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
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
      let from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={style.loginPage}>
      <h1>code2BUILD</h1>

      <form
        className={style.form}
        onSubmit={flag ? loginHandler : guestHandler}
      >
        <h2>LOGIN</h2>
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
        <div className={style.orLine}>
          <hr className={style.line} />
          <p className={style.or}>OR</p>
        </div>
        <p>
          Need An Account?{" "}
          <Link to="/signup" className={style.signup}>
            Signup
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
