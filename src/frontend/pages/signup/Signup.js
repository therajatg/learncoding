import style from "./signup.module.css";
import { useAuth } from "../../contexts/authContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
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
      toast.success("Signup Successful");
      navigate("/");
    } catch (err) {
      toast.error(`${err.response.status} Error. Please try again!`);
    }
  }

  return (
    <div className={style.signupPage}>
      <form className={style.form} onSubmit={signupHandler}>
        <p className={style.title}>Welcome to code2BUILD</p>

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
        <p className={style.loginLine}>
          Already have an account?{" "}
          <Link to="/login" className={style.login}>
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}
