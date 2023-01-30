import { useState } from "react";
import Movie from "./Movie";
import styles from "./Slide.module.css";

function Slide({ movieContents }) {
  const [trans, setTrans] = useState(0);
  const onClickL = () => {
    if (trans >= 0) return;
    setTrans((current) => current + 350);
  };
  const onClickR = () => {
    if (trans <= -2450) return;
    setTrans((current) => current - 350);
  };
  return (
    <div className={styles.container}>
      <div className={styles.slide_show}>
        <div
          className={styles.slide}
          style={{ transform: `translateX(${trans}px)` }}
        >
          {movieContents.map((movie) => {
            <Movie
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              year={movie.year}
              summary={movie.summary}
              genres={movie.genres}
            />;
          })}
        </div>
      </div>
      <div>
        <button className={styles.left} onClick={onClickL}></button>
        <button className={styles.right} onClick={onClickR}></button>
      </div>
    </div>
  );
}

export default Slide;
