import React, { Component } from 'react';

import './app.css';

import MovieList from '../MovieList';
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

    return (
      <MovieServiceProvider value={this.movieService}>
        <div className='movie-app'>
          <div className='movie-app-main'>
            <MovieList
              setValue={this.setValue}
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
          </div>
        </div>
      </MovieServiceProvider>
    );
  }
}
