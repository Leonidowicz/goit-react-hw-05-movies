import './MovieDetailsPage.scss';
import backImage from './0001.jpg';
import {
  useParams,
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { getOneMovie } from '../../services/AxiosMovies';
import Loader from 'react-loader-spinner';
import { Route } from 'react-router';

const Cast = lazy(() =>
  import('../Cast/Cast.jsx' /* webpackChunkName: "cast" */)
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.jsx' /* webpackChunkName: "reviews" */)
);

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [status, setStatus] = useState(true);

  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

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
    <div className="container">
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
              src={
                backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
                  : backImage
              }
              alt={alt}
            />
            <div className="about">
              <h2>{title || original_title || name}</h2>
              <p>{score}</p>
              <h3>Overview</h3>
              <p>{overview}</p>
              <h4>Genres</h4>
              <ul className="genres">
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
                    //*___________________Reviews*//
                    pathname: `${url}/reviews`,
                    state: {
                      from: {
                        location,
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
                    //*___________________Cast*//
                    pathname: `${url}/cast`,
                    state: {
                      from: {
                        // pathname: '/',
                        location,
                        hash: '#cast',
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
          <Suspense allback={<h1>LOADING</h1>}>
            <Route path="/movies/:movieId/cast">
              <Cast />
            </Route>

            <Route path="/movies/:movieId/reviews">
              <Reviews />
            </Route>
          </Suspense>
        </>
      )}
    </div>
  );
};
export default MovieDetailsPage;
