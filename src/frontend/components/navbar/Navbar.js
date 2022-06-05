import style from "./navbar.module.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";

export function Navbar() {
  return (
    <nav className={style.navContainer}>
      <div className={style.topLine}>
        <Link to="/" className={style.logo}>
          <h1>Code2BUILD</h1>
        </Link>
        <Link to="/" className={style.option}>
          Home
        </Link>
        <Link to="/" className={style.option}>
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
        <button className={style.login}>Login</button>
      </div>
    </nav>
  );
}
