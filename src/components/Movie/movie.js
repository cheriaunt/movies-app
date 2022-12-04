import React, { Component } from 'react';
import { format } from 'date-fns';
import { Rate, Progress } from 'antd';

import MovieService from '../../services/movie-service';
import { MovieServiceConsumer } from '../MovieServiceContext';

import './movie.css';
export default class Movie extends Component {
  movieService = new MovieService();

  setRate = (id, rate) => {
    localStorage.setItem(id, JSON.stringify(rate));
    this.movieService.setRateMovie(id, rate, sessionStorage.getItem('guestSessionId')).then();
  };

  render() {
    const { id, title, overview, releaseDate, voteAverage, posterPath, genre } = this.props;
    let date;
    try {
      date = format(new Date(releaseDate), 'MMMM dd, yyyy');
    } catch (error) {
      console.log('хуй');
    }

    const description = overview.slice(0, overview.slice(0, 90).lastIndexOf(' '));

    const defaultValueRate = !localStorage.getItem(id) ? 0 : localStorage.getItem(id);

    if (voteAverage >= 0 && voteAverage < 3) {
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
    } else if (voteAverage >= 3 && voteAverage < 5) {
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

    const genreList = genre.map((el) => (
      <MovieServiceConsumer key={el.toString()}>
        {(genres) => {
          return (
            <div className='movie-genre' key={el.toString()}>
              {genres.map((element) => {
                if (el === element.idGenre) {
                  return element.nameGenre;
                }
              })}
            </div>
          );
        }}
      </MovieServiceConsumer>
    ));

    return (
      <div className='view'>
        <div className='movie-poster'>
          <img src={`${posterPath}`} alt='movie' />
        </div>
        <div className='description'>
          <h1 className='movie-title '>{`${title}`}</h1>
          <div className='rating'>{this.progress}</div>
          <span className='movie-release'>{`${date}`}</span>
          <div className='movie-genres'>{genreList}</div>
          <p className='movie-description'>{`${description} ...`}</p>
          <Rate defaultValue={defaultValueRate} count={10} onChange={(rate) => this.setRate(id, rate)} />
        </div>
      </div>
    );
  }
}
