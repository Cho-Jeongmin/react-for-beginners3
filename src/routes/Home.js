import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Slide from "../components/Slide";
import Loading from "../components/Loding";
import navList from "../atom/NavList";
import Nav from "../components/Nav";
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
      <Nav />
      {navList.map((nav, idx) => {
        return (
          <div className={styles.slide_box} key={idx}>
            {movieContents && movieContents.length === 0 ? (
              <Loading />
            ) : (
              <div>
                <h3>
                  <Link to={`/page/${nav.path}/1`}>{nav.title} Movies</Link>
                </h3>{" "}
                <Slide movieContents={movieContents[idx]} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Home;
