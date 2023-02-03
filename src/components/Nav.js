import styles from "./Nav.module.css";
import navList from "../atom/NavList";
import { Link } from "react-router-dom";

function Nav({ detail }) {
  return (
    <div className={styles.container}>
      <nav className={styles.container}>
        <div className={styles.title}>
          <Link to="/">
            <i className="fa-sharp fa-solid fa-n">etflix</i>
          </Link>
        </div>
        <ul className={styles.option_list}>
          {navList.map(({ title, path }) => {
            return (
              <li key={title}>
                <Link to={`/page/${path}/1`}>{title}</Link>
              </li>
            );
          })}
        </ul>
        <ul className={styles.icon_list}>
          <li>
            <a href="https://www.instagram.com/">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://ko-kr.facebook.com/">
              <i className="fa-brands fa-square-facebook"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
