export const Review = ({ src, alt, title, score, overview, genres }) => {
  return (
    <>
      <div className="Info">
        <img src={src} alt={alt} />
        <div className="about">
          <h2>{title}</h2>
          <p>{score}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h4>Genres</h4>
          <p>{genres}</p>
        </div>
          </div>
          <div className="add">
              <p>Additional information</p>
              
          </div>
    </>
  );
};
