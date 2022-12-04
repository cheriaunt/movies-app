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
    };
  };

  _transformGenre = (genre) => {
    return {
      idGenre: genre.id,
      nameGenre: genre.name,
    };
  };
}
