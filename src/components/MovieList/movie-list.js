import React, { Component } from 'react';
// import { Spin } from 'antd';

import Movie from '../Movie';
// import Error from '../Error';
// import Spinner from '../Spinner';
import './movie-list.css';
import MovieService from '../../services/movie-service';

export default class MovieList extends Component {
  movieService = new MovieService();

  render() {
    const elMov = this.props.moviesArr.map((el) => {
      const { title, id, overview, releaseDate, posterPath, voteAverage } = el;
      const { error, loading } = this.props;

      return (
        <div className='movie-card' key={id}>
          <Movie
            moviesArr={el}
            id={id}
            title={title}
            overview={overview}
            releaseDate={releaseDate}
            posterPath={posterPath}
            loading={loading}
            error={error}
            voteAverage={voteAverage}
          />
        </div>
      );
    });
    return <div className='movie-list'>{elMov}</div>;
  }
}
