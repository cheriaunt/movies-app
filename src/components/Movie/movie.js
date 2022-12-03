import React, { Component } from 'react';
import { format } from 'date-fns';

import './movie.css';
export default class Movie extends Component {
  render() {
    const { title, overview, releaseDate, voteAverage, posterPath } = this.props;
    const date = format(new Date(releaseDate), 'MMMM dd, yyyy');
    const description = overview.slice(0, overview.slice(0, 100).lastIndexOf(' '));
    return (
      <div className='view'>
        <div className='movie-poster'>
          <img src={`${posterPath}`} alt='movie' />
        </div>
        <div className='description'>
          <h1 className='movie-title'>{`${title}`}</h1>
          <span className='movie-release'>{`${date}`}</span>
          <span className='rating'>{`${voteAverage}`}</span>
          <div className='movie-genres'>
            <div className='movie-genre'>Action</div>
            <div className='movie-genre'>Drama</div>
          </div>
          <p className='movie-description'>{`${description} ...`}</p>
        </div>
      </div>
    );
  }
}

// const { loading, error } = this.prors;
//       const hasData = !(loading || error);
//       const errorMessage = error ? <Error /> : null;
//       const spinner = loading ? <Spin /> : null;
//       const content = hasData ? (
