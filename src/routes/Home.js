import { useState, useEffect } from "react";
import Movie from "../components/Movie.js";
import styles from "./Home.module.css";
import navList from "../atom/NavList";
import axios from "axios";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const request = navList.map(({ title, path }) => {
      return axios.get(`https://yts.mx/api/v2/list_movies.json?${path}`, {
        params: { limit: 10, sort_by: "year" },
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
        setMovies(data[0]);
        setLoading(false);
      })
    );
  }, []);
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              year={movie.year}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
