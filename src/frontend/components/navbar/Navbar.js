import style from "./navbar.module.css";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuth } from "../../contexts/authContext";
import { useEffect, useState } from "react";
import axios from "axios";

export function Navbar() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/categories");
      setCategories(res.data.categories);
    })();
  });
  let { authState, authDispatch } = useAuth();
  let { token } = authState;
  const navigate = useNavigate();

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
        <Link to="/liked" className={style.option}>
          Liked
        </Link>
        <Link to="/watchLater" className={style.option}>
          Watch Later
        </Link>
        <Link to="/" className={style.option}>
          Playlist
        </Link>
        <Link to="/" className={`${style.option} ${style.dropdown}`}>
          Categories <IoMdArrowDropdown />
          <div className={style.dropdownContent}>
            {categories.map((category) => (
              <p>{category.categoryName}</p>
            ))}
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
