import React, { Component } from 'react';
import { Alert } from 'antd';

import Movie from '../Movie';
import './movie-list.css';

export default class MovieList extends Component {
  render() {
    const { moviesArr } = this.props;
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
    const elMov = moviesArr.map((el) => {
      const { title, id, overview, releaseDate, posterPath, voteAverage, genre } = el;

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
    return <div className='movie-list'>{elMov}</div>;
  }
}
