import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getOneMovie } from '../../services/AxiosMovies';
import Loader from 'react-loader-spinner';

export const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [status, setStatus] = useState(true);

  const { movieId } = useParams();

  const ganre = (id) => {
    let g = '';
    switch (id) {
      case 28:
        g = 'Action';
        break;
      case 12:
        g = 'Adventure';
        break;
      case 16:
        g = 'Animation';
        break;
      case 35:
        g = 'Comedy';
        break;
      case 80:
        g = 'Crime';
        break;
      case 99:
        g = 'Documentary';
        break;
      case 18:
        g = 'Drama';
        break;
      case 10751:
        g = 'Family';
        break;
      case 14:
        g = 'Fantasy';
        break;
      case 36:
        g = 'History';
        break;
      case 27:
        g = 'Horror';
        break;
      case 10402:
        g = 'Music';
        break;
      case 9648:
        g = 'Mystery';
        break;
      case 10749:
        g = 'Romance';
        break;
      case 878:
        g = 'Science Fiction';
        break;
      case 10770:
        g = 'TV Movie';
        break;
      case 53:
        g = 'Thriller';
        break;

      case 10752:
        g = 'War';
        break;

      case 37:
        g = 'Western';
        break;

      default:
        g = 'non ganre';
        break;
    }
    return g;
  };

  useEffect(() => {
    getOneMovie(movieId)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setMovie(response.data);
        setStatus(false);
      })
      .catch((error) => console.log(error));
  }, [movieId]);
  // console.log(movie);
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
                {genres.map((genre) => (
                  <li>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="add">
            <p>Additional information</p>
            <Link></Link>
            <Link></Link>
          </div>
        </>
      )}
    </>
  );
};
