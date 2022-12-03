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

  async getAllMovies() {
    const res = await this.getResource(
      `search/movie?api_key=${this._apiKey}&language=en-US&query=return&page=1&include_adult=false`,
    );
    return res.results.map(this._transformMovie);
  }

  async getMovies(string, number) {
    let res;
    if (string === '') {
      res = await this.getResource(`search/movie?api_key=${this._apiKey}&language=en-US&query=return&page=${number}`);
      return res.results.map(this._transformMovie);
    } else {
      res = await this.getResource(
        `search/movie?api_key=${this._apiKey}&language=en-US&query=${string}&page=${number}`,
      );
      return res.results.map(this._transformMovie);
    }
  }

  async getGuestSession() {
    const res = await this.getResource(`authentication/guest_session/new?api_key=${this._apiKey}`);
    return res.results;
  }

  _transformMovie = (mov) => {
    return {
      id: mov.id,
      title: mov.title,
      overview: mov.overview,
      releaseDate: mov.release_date,
      posterPath: `https://image.tmdb.org/t/p/original${mov.poster_path}`,
      voteAverage: mov.vote_average,
      currentPage: mov.page,
    };
  };
}
