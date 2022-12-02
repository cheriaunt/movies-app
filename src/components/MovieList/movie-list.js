import React, { Component } from 'react';

import Movie from '../Movie';
import Error from '../Error';
import Spinner from '../Spinner';
import './movie-list.css';
import MovieService from '../../services/movie-service';

export default class MovieList extends Component {
  movieService = new MovieService();

  constructor() {
    super();
    this.state = {
      moviesArr: [],
      loading: true,
      error: false,
      // network: true,
    };
  }
  componentDidMount() {
    this.updateMovie();
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
      // network: false,
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
    const elMov = this.state.moviesArr.map((el) => {
      const { title, id, overview, releaseDate, posterPath, voteAverage } = el;
      const { loading, error } = this.state;
      const hasData = !(loading || error);
      const errorMessage = error ? <Error /> : null;
      const spinner = loading ? <Spinner /> : null;
      const content = hasData ? (
        <Movie
          moviesArr={el}
          id={id}
          title={title}
          overview={overview}
          releaseDate={releaseDate}
          posterPath={posterPath}
          loading={loading}
          voteAverage={voteAverage}
        />
      ) : null;

      return (
        <div className='movie-card' key={id}>
          {errorMessage}
          {spinner}
          {content}
        </div>
      );
    });
    return <div className='movie-list'>{elMov}</div>;
  }
}
