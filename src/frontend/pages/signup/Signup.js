import style from "./signup.module.css";
import { useAuth } from "../../contexts/authContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export function Signup() {
  const { authState, authDispatch } = useAuth();
  const { user } = authState;
  const navigate = useNavigate();

  console.log(user);

  async function signupHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("token", res.data.encodedToken);
      authDispatch({ type: "TOKEN", payload: res.data.encodedToken });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={style.signupPage}>
      <h1>code2BUILD</h1>

      <form className={style.form} onSubmit={signupHandler}>
        <h2>SIGN-UP</h2>
        <div className={style.name}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
        </div>
        <button className={style.signupBtn}>Create New Account</button>

        <div className={style.orLine}>
          <hr className={style.line} />
          <p className={style.or}>OR</p>
        </div>
        <p>
          Already have an account?{" "}
          <Link to="/login" className={style.login}>
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
