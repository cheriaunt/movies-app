import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Input, Pagination } from 'antd';
import { debounce } from 'lodash';

import './app.css';

import MovieList from '../MovieList';
import Error from '../Error';
import Spinner from '../Spinner';
import MovieService from '../../services/movie-service';
import { MovieServiceProvider } from '../MovieServiceContext';

export default class App extends Component {
  page = 1;

  movieService = new MovieService();

  state = {
    moviesArr: [],
    genres: [],
    loading: true,
    error: false,
    currentPage: this.page,
    inputValue: 'return',
    guestId: '',
  };

  componentDidMount() {
    this.guestSession();
    this.updateMovie(this.state.inputValue, this.state.currentPage);

    this.getMovieGenres();
    this.setState({ loading: true });
  }

  componentDidUpdate(prevState) {
    if (this.state.currentPage === prevState.currentPage) {
      this.updateMovie();
    }
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

  onGenresLoaded = (genres) => {
    this.setState({
      genres,
      error: false,
    });
  };

  updateMovie(string, page) {
    this.movieService.getMovies(string, page).then(this.onMovieLoaded).catch(this.onError);
  }

  setValue = debounce((e) => {
    this.updateMovie(e.target.value, this.state.currentPage);
    this.setState({
      loading: true,
      inputValue: e.target.value,
      currentPage: this.page,
    });
  }, 1000);

  guestSession = () => {
    this.movieService.getGuestSession().then((guestSession) => sessionStorage.setItem('guestSessionId', guestSession));
  };

  getMovieGenres = () => {
    this.movieService.getGenres().then(this.onGenresLoaded).catch(this.onError);
  };

  render() {
    const {
      moviesArr,
      loading,
      id,
      title,
      overview,
      releaseDate,
      posterPath,
      voteAverage,
      genre,
      error,
      inputValue,
      genres,
    } = this.state;

    const hasData = !(loading || error);
    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner className='spinner' /> : null;
    const content = hasData ? (
      <React.Fragment>
        <MovieList
          moviesArr={moviesArr}
          loading={loading}
          id={id}
          title={title}
          overview={overview}
          releaseDate={releaseDate}
          posterPath={posterPath}
          voteAverage={voteAverage}
          genre={genre}
          error={error}
          setValue={this.setValue}
        />
      </React.Fragment>
    ) : null;
    return (
      <MovieServiceProvider value={genres}>
        <Online>
          <div className='movie-app'>
            <Input className='ant-input' placeholder='Type to search...' onChange={(e) => this.setValue(e)} autoFocus />
            {spinner}
            {errorMessage}
            {content}
            <div className='movie-app-footer'>
              <Pagination
                className='app-pagination'
                size='small'
                total={50}
                onChange={(currentPage) => this.updateMovie(inputValue, currentPage)}
              />
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
