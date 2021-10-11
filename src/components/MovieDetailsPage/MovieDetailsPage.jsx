import {
  useParams,
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getOneMovie } from '../../services/AxiosMovies';
import Loader from 'react-loader-spinner';
import { Route } from 'react-router';
import { Cast } from '../Cast/Cast.jsx';
import { Reviews } from '../Reviews/Reviews.jsx';

export const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [status, setStatus] = useState(true);

  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const location = useLocation();
  // console.log(location);
  const history = useHistory();
  console.log(history);

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

  const onGoBack = () => {
    history.push(location?.state?.from.location ?? '/');
  };
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
          <button type="button" onClick={onGoBack}>
            {location?.state?.from?.label ?? 'Return'}
          </button>
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
                    state: {
                      from: {
                        pathname: '/',
                        label: 'Return to previous page',
                      },
                    },
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
                    state: {
                      from: {
                        pathname: '/',
                        label: 'Return to previous page',
                      },
                    },
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
