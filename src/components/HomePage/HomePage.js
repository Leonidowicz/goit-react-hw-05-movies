import { useState, useEffect, lazy } from 'react';
import { getTrend } from '../../services/AxiosMovies';

const MovieList = lazy(() =>
  import('../MovieList/MovieList.js' /* webpackChunkName: "movie-list" */)
);

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrend()
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Tranding today</h1>
      <MovieList movies={movies} />
    </>
  );
};
export default HomePage;
