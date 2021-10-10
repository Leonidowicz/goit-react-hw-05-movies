import { useState, useEffect } from 'react';
import { getTrend } from '../../services/AxiosMovies';
import { MovieList } from '../MovieList/MovieList';

export const HomePage = () => {
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
