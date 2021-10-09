import { Link, useRouteMatch } from 'react-router-dom';

export const MovieList = ({ movies, titel }) => {
  const { url } = useRouteMatch();
  return (
    <>
      <h1>{titel}</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                // state: { from: '' },
              }}
            >
              {movie.title ||
                movie.original_title ||
                movie.name ||
                'No name movie'}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
