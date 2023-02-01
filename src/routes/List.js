import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styles from "./List.module.css";
import Movie from "../components/Movie.js";
import { listPageReloading, focusNav } from "../atom/Atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

const listNums = [...Array(10)].map((_, i) => i + 1);

function List() {
  const { num, detail } = useParams(); //url에서 쿼리 파라미터 가져오기
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [reloading, setReloading] = useRecoilState(listPageReloading); //전역 state
  const focusPage = useSetRecoilState(focusNav); //전역 state
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?page=${num}&${detail}&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    setReloading(false); //reloading이 일어났으니까 다시 false로 초기화
    setLoading(true); //로딩중 화면 표시해야하니까 true로
    focusPage(detail); //뭔진 모르겠지만.. 현재 디테일 화면이라는 뜻인듯
    getMovies();
  }, [reloading]); //reloading을 감시하다가 변화가 있을시 위의 코드가 실행됨
  return (
    <div className={styles.container}>
      <ul>
        {loading
          ? null
          : listNums.map((listNum) => {
              return (
                <li key={listNum}>
                  <Link
                    to={`/page/${detail}/${listNum}`}
                    onClick={() => setReloading(true)}
                  >
                    {listNum}
                  </Link>
                </li>
              );
            })}
      </ul>
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

export default List;
