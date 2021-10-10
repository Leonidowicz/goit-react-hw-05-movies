import { getCast } from '../../services/AxiosMovies';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import ScrollToTop from 'react-scroll-to-top';



export const Cast = () => {

  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState(0);
  
  
  useEffect(() => {
    getCast(movieId).then((data) => {
      setCast(data.data.cast);
      setStatus(data.status);
      window.scrollTo(0, 700)
    });
  }, [movieId]);
  return (
    < ><ScrollToTop smooth={true}  />

      {!status && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={0}
        />
      )}
      {cast.length ? (
        
        <ul >
          {cast.map(({profile_path, cast_id, name, character}) => (
            <li key={cast_id}>
              {profile_path&&<img height="200"
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
 alt={name} />}
              <p>{name}.</p>
              {character&&<p>Character: {character}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p >This movie not have reviews</p>
      )}
    </>
  );
};
