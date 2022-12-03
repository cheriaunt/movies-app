import React, { Component } from 'react';
import { format } from 'date-fns';
import { Progress } from 'antd';

import './movie.css';
export default class Movie extends Component {
  render() {
    const { title, overview, releaseDate, voteAverage, posterPath } = this.props;
    const date = format(new Date(releaseDate), 'MMMM dd, yyyy');
    const description = overview.slice(0, overview.slice(0, 100).lastIndexOf(' '));
    if (voteAverage >= 0 && voteAverage <= 3) {
      this.progress = (
        <Progress
          type='circle'
          status='normal'
          width={30}
          percent={100}
          format={() => voteAverage}
          strokeColor={{
            '100%': '#E90000',
          }}
        />
      );
    } else if (voteAverage >= 3 && voteAverage <= 5) {
      this.progress = (
        <Progress
          type='circle'
          status='normal'
          width={30}
          percent={100}
          format={() => voteAverage}
          strokeColor={{
            '100%': '#E97E00',
          }}
        />
      );
    } else if (voteAverage >= 5 && voteAverage <= 7) {
      this.progress = (
        <Progress
          type='circle'
          status='normal'
          width={30}
          percent={100}
          format={() => voteAverage}
          strokeColor={{
            '100%': '#E9D100',
          }}
        />
      );
    } else if (voteAverage > 7) {
      this.progress = (
        <Progress
          type='circle'
          status='normal'
          width={30}
          percent={100}
          format={() => voteAverage}
          color='black'
          strokeColor={{
            '100%': '#66E900',
          }}
        />
      );
    }
    return (
      <div className='view'>
        <div className='movie-poster'>
          <img src={`${posterPath}`} alt='movie' />
        </div>
        <div className='description'>
          <h1 className='movie-title '>{`${title}`}</h1>
          <div className='rating'>{this.progress}</div>
          <span className='movie-release'>{`${date}`}</span>
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
