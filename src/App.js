import { Switch, Route } from 'react-router';

import './App.css';

import { AppBar } from './components/AppBar/AppBar';
import { MoviesPage } from './components/MoviesPage/MoviesPage';
import { HomePage } from './components/HomePage/HomePage';
import { MovieDetailsPage } from './components/MovieDetailsPage/MovieDetailsPage';
// import { Cast } from './components/Cast/Cast';
// import { Reviews } from './components/Reviews/Reviews';
import { NotFound } from './components/NotFound/NotFound';

export default function App() {
  return (
    <div className="App">
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>

        {/* <Route to="/movies/cast/:movieId">
          <Cast />
        </Route>
        <Route to="/movies/reviews/:movieId">
          <Reviews /> </Route>*/}

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}
