import { Switch, Route } from 'react-router';
import { lazy, Suspense } from 'react';
import './App.scss';
import { AppBar } from './components/AppBar/AppBar';

const MoviesPage = lazy(() =>
  import(
    './components/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */
  )
);
const HomePage = lazy(() =>
  import('./components/HomePage/HomePage' /* webpackChunkName: "home-page" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  )
);
const NotFound = lazy(() =>
  import('./components/NotFound/NotFound' /* webpackChunkName: "not-found" */)
);

export default function App() {
  return (
    <div className="app">
      <AppBar />
      <Suspense fallback={<h1>LOADING</h1>}>
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
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
