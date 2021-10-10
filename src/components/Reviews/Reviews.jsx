import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getReview } from "../../services/AxiosMovies";
import Loader from "react-loader-spinner";
export const Reviews = () => {
  const { movieId } = useParams()
  const [review, setReview] = useState([])
  const [status, setStatus] = useState(0)

  useEffect(() => {
    getReview(movieId).then(data => {
      setReview(data.data.results);
      setStatus(data.status)
    })
  }, [movieId]);

  return <> {!status &&
    <Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={0}
    />}
    {review.length
      ? <ul>{review.map(rev => <li><p>Author Username: {rev.author}.</p><p>{rev.content}</p></li>)}</ul>
      : <p>This movie not have reviews</p>
    }</>
}
