import { NavLink } from 'react-router-dom';
import './Navigation.scss';
export const Navigation = () => {
  return (
    <nav className="nav">
      <NavLink to="/" exact activeClassName="activ" className="home">
        Home
      </NavLink>
      <NavLink to="/movies" activeClassName="activ" className=".movies">
        Movies
      </NavLink>
    </nav>
  );
};
