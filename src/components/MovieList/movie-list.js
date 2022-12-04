import React, { Component } from 'react';
import { Alert } from 'antd';

import Movie from '../Movie';
import './movie-list.css';

export default class MovieList extends Component {
  render() {
    const { moviesArr, rateMoviesArr, activeKey } = this.props;
    if (moviesArr.length === 0) {
      return (
        <Alert
          message='Поиск не дал результатов.'
          description='Проверьте правильно ли вы ввели название фильма.'
          type='info'
          closable
        />
      );
    }
    const Movies = moviesArr.map((el) => {
      const { id, title, overview, releaseDate, posterPath, voteAverage, genre } = el;

      return (
        <div className='movie-card' key={id}>
          <Movie
            moviesArr={el}
            id={id}
            title={title}
            overview={overview}
            releaseDate={releaseDate}
            posterPath={posterPath}
            voteAverage={voteAverage}
            genre={genre}
          />
        </div>
      );
    });
    const MoviesRate = rateMoviesArr.map((el) => {
      const { title, id, overview, releaseDate, posterPath, voteAverage, genre } = el;

      return (
        <div className='movie-card' key={id}>
          <Movie
            rateMoviesArr={el}
            id={id}
            title={title}
            overview={overview}
            releaseDate={releaseDate}
            posterPath={posterPath}
            voteAverage={voteAverage}
            genre={genre}
          />
        </div>
      );
    });
    return activeKey === '1' ? (
      <div className='movie-list'>{Movies}</div>
    ) : (
      <div className='movie-list'>{MoviesRate}</div>
    );
  }
}
