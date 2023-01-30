import { useState } from "react";
import Movie from "./Movie";

function Slide({ movieContents }) {
  const [trans, setTrans] = useState();
  const onClickL = () => {
    if (trans >= 0) return;
    setTrans((current) => current + 350);
  };
  const onClickR = () => {
    if (trans <= -2450) return;
    setTrans((current) => current - 350);
  };
  return (
    <div>
      <div>
        <div style={{ transform: `translateX(${trans})` }}>
          {movieContents.map((movie) => {
            <Movie
              id={movie.id}
              coverImg={movie.coverImg}
              title={movie.title}
              year={movie.year}
              summary={movie.summary}
              genres={movie.genres}
            />;
          })}
        </div>
      </div>
      <div>
        <button onclick={onClickL}></button>
        <button onClick={onClickR}></button>
      </div>
    </div>
  );
}

export default Slide;
