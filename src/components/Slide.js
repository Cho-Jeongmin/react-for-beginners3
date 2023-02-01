import { useState } from "react";
import styles from "./Slide.module.css";
import Movie from "./Movie";

function Slide({ movieContents }) {
  const [trans, setTrans] = useState(0); // 슬라이드가 얼마나 넘겨졌는지 담을 변수
  // 왼쪽 버튼 (슬라이드를 오른쪽으로 옮기기)
  const onClickL = () => {
    if (trans >= 0) return;
    setTrans((current) => current + 350);
  };
  //오른쪽 버튼 (슬라이드를 왼쪽으로 옮기기)
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
          {movieContents.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              year={movie.year}
              summary={movie.summary}
              genres={movie.genres}
              movie_style={{ minWidth: "350px", height: "300px" }}
            />
          ))}
        </div>
      </div>
      <div>
        <button className={styles.left} onClick={onClickL}>
          {"<"}
        </button>
        <button className={styles.right} onClick={onClickR}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Slide;
