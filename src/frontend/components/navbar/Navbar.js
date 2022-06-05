import style from "./navbar.module.css";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuth } from "../../contexts/authContext";

export function Navbar() {
  let { authState, authDispatch } = useAuth();
  let { token } = authState;
  const navigate = useNavigate();
  console.log(token);

  const loginHandler = () => {
    navigate("/login");
  };

  const logoutHandler = () => {
    authDispatch({ type: "TOKEN", payload: null });
  };

  return (
    <nav className={style.navContainer}>
      <div className={style.topLine}>
        <Link to="/" className={style.logo}>
          <h1>Code2BUILD</h1>
        </Link>
        <Link to="/" className={style.option}>
          Home
        </Link>
        <Link to="/history" className={style.option}>
          History
        </Link>
        <Link to="/" className={style.option}>
          Liked
        </Link>
        <Link to="/" className={style.option}>
          Watch Later
        </Link>
        <Link to="/" className={style.option}>
          Playlist
        </Link>
        <Link to="/" className={`${style.option} ${style.dropdown}`}>
          Categories <IoMdArrowDropdown />
          <div className={style.dropdownContent}>
            <p>JavaScript Concepts</p>
            <p>Promise in JavaScript</p>
            <p>ReactJS Concepts</p>
            <p>React Router</p>
            <p>CSS</p>
          </div>
        </Link>
      </div>

      <div className={style.bottomLine}>
        <div className={style.searchBar}>
          <input
            type="search"
            placeholder="Search..."
            className={style.searchInput}
          />
          <FaSearch className={style.searchIcon} />
        </div>
        {token && (
          <button onClick={logoutHandler} className={style.login}>
            Logout
          </button>
        )}
        {!token && (
          <button onClick={loginHandler} className={style.login}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
