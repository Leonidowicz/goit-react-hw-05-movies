import { getByQuery } from '../../services/AxiosMovies';
import { useState, useEffect } from 'react';
import { MovieList } from '../MovieList/MovieList';

export const MoviesPage = () => {
  const [valueForm, setValueForm] = useState('batman');
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getByQuery(query)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => console.log(error));
  }, [query]);
  const onChange = (event) => {
    event.preventDefault();
    setValueForm(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setQuery(valueForm);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <label>
          <input type="text" value={valueForm} onChange={onChange} />
        </label>
        <input type="submit" value="Search Movie" />
      </form>
      <MovieList movies={movies} titel={'Films found'} />
    </>
  );
};
