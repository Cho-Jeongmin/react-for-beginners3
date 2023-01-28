import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  //const [downloadCount, setDownloadCount] = useState("");
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  //console.log(movie);
  function getcount() {
    if (movie.download_count > 1000000) {
      return (movie.download_count / 1000000).toFixed(1) + "M+";
    } else if (movie.download_count > 1000) {
      return (movie.download_count / 1000).toFixed(1) + "K+";
    } else {
      return movie.download_count;
    }
  }
  //console.log(movie.download_count + " : " + downloadCount);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.container}>
          <img src={movie.background_image} alt={movie.title} />
          <div className={styles.movie}>
            <img
              className={styles.img}
              src={movie.medium_cover_image}
              alt={movie.title}
            />
            <div>
              <h1>{movie.title}</h1>
              <ul className={styles.info}>
                <li>{movie.year}</li>
                <li>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
                </li>
                <li>Rating: {movie.rating}</li>
                <li>Downloads: {getcount()}</li>
              </ul>
              <ul className={styles.genres}>
                {movie.genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
              <p>{movie.description_full}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
