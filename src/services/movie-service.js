export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/';
  _apiKey = '437647b7220e505458bbd2f875d9ede6';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getMovies(string, page) {
    let res;
    if (string === '') {
      res = await this.getResource(`search/movie?api_key=${this._apiKey}&language=en-US&query=return&page=${page}`);
      return res.results.map(this._transformMovie);
    } else {
      res = await this.getResource(`search/movie?api_key=${this._apiKey}&language=en-US&query=${string}&page=${page}`);
      return res.results.map(this._transformMovie);
    }
  }

  async getGuestSession() {
    const res = await this.getResource(`authentication/guest_session/new?api_key=${this._apiKey}`);
    return res.guest_session_id;
  }

  async getGenres() {
    const res = await this.getResource(`genre/movie/list?api_key=${this._apiKey}&language=en-US`);
    return res.genres.map(this._transformGenre);
  }

  async getRateMovies(guestSessionId, page) {
    const res = await fetch(
      `${this._apiBase}guest_session/${guestSessionId}/rated/movies?api_key=${this._apiKey}&page=${page}`,
    );
    if (!res.ok) {
      throw new Error(`Could not fetch getRateMovies, received ${res.status}`);
    }
    const rateMovies = await res.json();
    const arrRateMovies = rateMovies.results.map(this._transformRateMovie);
    return { arr: arrRateMovies, totalPage: rateMovies.total_pages };
  }

  async setRateMovie(id, rate, guestSessionId) {
    let res = await fetch(
      `${this._apiBase}movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${guestSessionId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          value: `${rate}`,
        }),
      },
    );
    if (!res.ok) {
      throw new Error(`Could not fetch setRateMovie, received ${res.status}`);
    }
    const setRate = await res.json();
    return setRate;
  }

  _transformMovie = (movie) => {
    return {
      id: movie.id,
      title: movie.title,
      genre: movie.genre_ids,
      overview: movie.overview,
      releaseDate: movie.release_date,
      posterPath: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      voteAverage: movie.vote_average,
      currentPage: movie.page,
      totalPage: 0,
    };
  };

  _transformGenre = (genre) => {
    return {
      idGenre: genre.id,
      nameGenre: genre.name,
    };
  };

  _transformRateMovie = (rateMovie) => {
    return {
      id: rateMovie.id,
      title: rateMovie.title,
      genre: rateMovie.genre_ids,
      overview: rateMovie.overview,
      releaseDate: rateMovie.release_date,
      posterPath: `https://image.tmdb.org/t/p/original${rateMovie.poster_path}`,
      voteAverage: rateMovie.vote_average,
      currentPage: rateMovie.page,
      totalPage: 0,
    };
  };
}
