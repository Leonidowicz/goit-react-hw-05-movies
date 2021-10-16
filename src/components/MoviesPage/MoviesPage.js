import { getByQuery } from '../../services/AxiosMovies';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';

const MovieList = lazy(() =>
  import('../MovieList/MovieList.js' /* webpackChunkName: "movie-list" */)
);

const MoviesPage = () => {
  const [valueForm, setValueForm] = useState('batman');
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const location = useLocation();
  const history = useHistory();
  const getQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (getQuery?.length > 0) {
      setQuery(getQuery);
    }
    if (query === '') {
      return;
    }

    getByQuery(query)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => console.log(error));
  }, [getQuery, query]);

  const onChange = (event) => {
    event.preventDefault();
    setValueForm(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setQuery(valueForm);
    history.push({ ...location, search: `query=${valueForm}` });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <label>
          <input type="text" value={valueForm} onChange={onChange} />
        </label>
        <input type="submit" value="Search Movie" />
      </form>
      {movies.length !== 0 && (
        <Suspense fallback={<h1>LOADING</h1>}>
          <MovieList movies={movies} titel={'Films found'} />
        </Suspense>
      )}
    </>
  );
};
export default MoviesPage;
