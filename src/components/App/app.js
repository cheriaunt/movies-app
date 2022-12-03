import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';

import './app.css';

import MovieList from '../MovieList';
import Error from '../Error';
import Spinner from '../Spinner';
import MovieService from '../../services/movie-service';
import { MovieServiceProvider } from '../MovieServiceContext';

export default class App extends Component {
  movieService = new MovieService();
  state = {
    moviesArr: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateMovie();
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  onMovieLoaded = (moviesArr) => {
    this.setState({
      moviesArr,
      loading: false,
      error: false,
    });
  };

  updateMovie() {
    this.movieService.getAllMovies().then(this.onMovieLoaded).catch(this.onError);
  }

  render() {
    const { moviesArr, loading, id, title, overview, releaseDate, posterPath, voteAverage, error } = this.state;

    const hasData = !(loading || error);
    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner className='spinner' /> : null;
    const content = hasData ? (
      <MovieList
        moviesArr={moviesArr}
        loading={loading}
        id={id}
        title={title}
        overview={overview}
        releaseDate={releaseDate}
        posterPath={posterPath}
        voteAverage={voteAverage}
        error={error}
      />
    ) : null;
    return (
      <MovieServiceProvider value={this.movieService}>
        <Online>
          {spinner}
          <div className='movie-app'>
            <div className='movie-app-main'>
              {errorMessage}
              {content}
            </div>
          </div>
        </Online>
        <Offline>
          <Error />
        </Offline>
      </MovieServiceProvider>
    );
  }
}
