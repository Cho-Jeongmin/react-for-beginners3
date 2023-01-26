import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
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
  console.log(movie);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.background_image} alt={movie.title} />
          <div>
            <img src={movie.medium_cover_image} alt={movie.title} />
            <div>
              <h1>{movie.title}</h1>
              <h3>{movie.year}</h3>
              <h3>
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
              </h3>
              <h3>Rating: {movie.rating}</h3>
              <h3>Downloads: {movie.download_count}</h3>
              <ul>
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
