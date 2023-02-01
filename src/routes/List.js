import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styles from "./List.module.css";
import Movie from "../components/Movie.js";
import { listPageReloading, focusNav } from "../atom/Atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

const listNums = [...Array(10)].map((_, i) => i + 1);

function List() {
  const { num, detail } = useParams(); //url���� ���� �Ķ���� ��������
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [reloading, setReloading] = useRecoilState(listPageReloading); //���� state
  const focusPage = useSetRecoilState(focusNav); //���� state
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
    setReloading(false); //reloading�� �Ͼ���ϱ� �ٽ� false�� �ʱ�ȭ
    setLoading(true); //�ε��� ȭ�� ǥ���ؾ��ϴϱ� true��
    focusPage(detail); //���� �𸣰�����.. ���� ������ ȭ���̶�� ���ε�
    getMovies();
  }, [reloading]); //reloading�� �����ϴٰ� ��ȭ�� ������ ���� �ڵ尡 �����
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
