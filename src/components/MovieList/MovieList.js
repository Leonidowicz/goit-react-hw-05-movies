import { Link, useLocation } from 'react-router-dom';

export const MovieList = ({ movies, titel }) => {
  const location = useLocation();

  return (
    <>
      <h1>{titel}</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: {
                  from: {
                    location,
                    // search: '?sort=name',
                    label: 'Return to previous page',
                  },
                },
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
