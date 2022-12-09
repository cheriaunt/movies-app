import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Input, Pagination, Tabs } from 'antd';
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
    rateMoviesArr: [],
    totalPage: 50,
    genres: [],
    loading: true,
    error: false,
    currentPage: this.page,
    inputValue: 'return',
    guestSessionId: '',
    activeKey: '1',
  };

  componentDidMount() {
    this.guestSession();
    this.state.activeKey === '1'
      ? this.updateMovie(this.state.inputValue, this.state.currentPage)
      : this.updateRateMovie(sessionStorage.getItem('guestSessionId'), this.state.currentPage);

    this.getMovieGenres();
    this.setState({ loading: true });
  }

  changeTab = (activeKey) => {
    activeKey === '1'
      ? this.updateMovie(this.state.inputValue, this.state.currentPage)
      : this.updateRateMovie(sessionStorage.getItem('guestSessionId'), this.state.currentPage);
    this.setState({
      activeKey,
    });
  };
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  onMovieLoaded = (moviesArr) => {
    this.setState({
      moviesArr,
      totalPage: 50,
      loading: false,
      error: false,
    });
  };

  onRateMovieLoaded = (rateMoviesArr) => {
    this.setState({
      rateMoviesArr: rateMoviesArr.arr,
      totalPage: rateMoviesArr.totalPage * 10,
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

  updateRateMovie(guestSessionId, page) {
    this.movieService.getRateMovies(guestSessionId, page).then(this.onRateMovieLoaded).catch(this.onError);
  }

  guestSession = () => {
    this.movieService.getGuestSession().then((guestSession) => sessionStorage.setItem('guestSessionId', guestSession));
  };

  getMovieGenres = () => {
    this.movieService.getGenres().then(this.onGenresLoaded).catch(this.onError);
  };

  render() {
    const {
      moviesArr,
      rateMoviesArr,
      loading,
      id,
      title,
      overview,
      releaseDate,
      posterPath,
      voteAverage,
      genre,
      error,
      genres,
      activeKey,
      inputValue,
      totalPage,
    } = this.state;

    const hasData = !(loading || error);
    const errorMessage = error ? <Error /> : null;
    const spinner = loading ? <Spinner className='spinner' /> : null;
    const content = hasData ? (
      <React.Fragment>
        <MovieList
          moviesArr={moviesArr}
          rateMoviesArr={rateMoviesArr}
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
          activeKey={activeKey}
        />
      </React.Fragment>
    ) : null;

    return (
      <MovieServiceProvider value={genres}>
        <Online>
          <div className='movie-app'>
            <Tabs
              className='button'
              defaultActiveKey='1'
              activeKey={this.state.activeKey}
              centered
              destroyInactiveTabPane='true'
              onChange={(activeKey) => this.changeTab(activeKey)}
              items={[
                {
                  label: 'Search',
                  key: '1',
                  children: (
                    <Input
                      className='ant-input'
                      placeholder='Type to search...'
                      onChange={(e) => this.setValue(e)}
                      autoFocus
                    />
                  ),
                },
                { label: 'Rated', key: '2', children: '' },
              ]}
            />
            {spinner}
            {errorMessage}
            {content}
            <div className='movie-app-footer'>
              <Pagination
                size='small'
                total={totalPage}
                onChange={
                  activeKey === '1'
                    ? (currentPage) => this.updateMovie(inputValue, currentPage)
                    : (currentPage) => this.updateRateMovie(sessionStorage.getItem('guestSessionId'), currentPage)
                }
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
