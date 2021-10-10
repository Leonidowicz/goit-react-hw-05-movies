import { useParams, NavLink, useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getOneMovie } from '../../services/AxiosMovies';
import Loader from 'react-loader-spinner';
import { Route } from 'react-router';
import { Cast } from '../Cast/Cast';
import { Reviews } from '../Reviews/Reviews.jsx';

export const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [status, setStatus] = useState(true);

  const { movieId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    getOneMovie(movieId)
      .then((response) => {
        setMovie(response.data);
        setStatus(false);
      })
      .catch((error) => console.log(error));
  }, [movieId]);
  const {
    backdrop_path,
    alt,
    title,
    score,
    overview,
    genres,
    original_title,
    name,
  } = movie;

  return (
    //*___________________SPINNER*//
    <>
      {status ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={0}
        />
      ) : (
        //*___________________MAIN INFO*//
        <>
          <div className="Info">
            <img
              src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
              alt={alt}
            />
            <div className="about">
              <h2>{title || original_title || name}</h2>
              <p>{score}</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h4>Genres</h4>
              <ul>
                {genres.map((genre, id) => (
                  <li key={id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="add">
            <p>Additional information</p>
            <ul>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    // state: { from: '' },
                  }}
                >
                  Reviews
                </NavLink>
              </li>

              <li>
                {' '}
                <NavLink
                  to={{
                    pathname: `${url}/cast`,
                    // state: { from: '' },
                  }}
                >
                  {' '}
                  Cast
                </NavLink>
              </li>
            </ul>
          </div>

          <Route path="/movies/:movieId/cast">
            <Cast />
          </Route>
          <Route path="/movies/:movieId/reviews">
            <Reviews />
          </Route>
        </>
      )}
    </>
  );
};
