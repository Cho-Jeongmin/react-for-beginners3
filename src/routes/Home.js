import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Slide from "../components/Slide";
import navList from "../atom/NavList";
import axios from "axios";

function Home() {
  const [movieContents, setMovieContents] = useState([]);

  useEffect(() => {
    const request = navList.map(({ title, path }) => {
      return axios.get(`https://yts.mx/api/v2/list_movies.json?${path}`, {
        params: { limit: 10, sort_by: "year" }, //영화 10개만 가져오기
      });
    });

    axios.all(request).then(
      axios.spread(async (...response) => {
        const data = await response.map((res) => {
          if (res.status === 200) {
            return res.data.data.movies;
          }
        });
        console.log(data);
        setMovieContents(data);
      })
    );
  }, []);
  return (
    <div className={styles.container}>
      {navList.map((nav, idx) => {
        return (
          <div className={styles.slide_box} key={idx}>
            <h3>
              <Link to={`/page/${nav.path}/1`}>{nav.title}</Link>
            </h3>
            {movieContents && movieContents.length === 0 ? (
              "Loading"
            ) : (
              <Slide movieContents={movieContents[idx]} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Home;
