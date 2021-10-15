import { Switch, Route } from 'react-router';
import { lazy, Suspense } from 'react';
import './App.css';
import { AppBar } from './components/AppBar/AppBar';

// import { MoviesPage } from './components/MoviesPage/MoviesPage';
// import { HomePage } from './components/HomePage/HomePage';
// import { MovieDetailsPage } from './components/MovieDetailsPage/MovieDetailsPage.jsx';
// import { NotFound } from './components/NotFound/NotFound';

const MoviesPage = lazy(() => import('./components/MoviesPage/MoviesPage'));
const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const MovieDetailsPage = lazy(() =>
  import('./components/MovieDetailsPage/MovieDetailsPage')
);
const NotFound = lazy(() => import('./components/NotFound/NotFound'));

export default function App() {
  return (
    <div className="App">
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
