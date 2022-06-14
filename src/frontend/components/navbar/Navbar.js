import style from "./navbar.module.css";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuth, useData } from "../../contexts/index";
import { useEffect, useState } from "react";
import axios from "axios";

export function Navbar() {
  const [categories, setCategories] = useState([]);
  const { authState, authDispatch } = useAuth();
  const { token } = authState;
  const { dataDispatch } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res1 = await axios.get("/api/categories");
      setCategories(res1.data.categories);
    })();
  });

  const loginHandler = () => {
    navigate("/login");
  };

  const logoutHandler = () => {
    authDispatch({ type: "TOKEN", payload: null });
  };

  const searchHandler = () => {};

  return (
    <nav className={style.navContainer}>
      <div className={style.topLine}>
        <Link to="/" className={style.logo}>
          <h1 onClick={() => dataDispatch({ type: "RESET" })}>Code2BUILD</h1>
        </Link>
        <Link
          to="/"
          className={style.option}
          onClick={() => dataDispatch({ type: "RESET" })}
        >
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
              <option
                value={category.categoryName}
                onClick={(e) =>
                  dataDispatch({
                    type: "CATEGORY",
                    payload: e.target.value,
                  })
                }
              >
                {category.categoryName}
              </option>
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
            onChange={(e) =>
              dataDispatch({
                type: "SEARCH",
                payload: e.target.value,
              })
            }
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
