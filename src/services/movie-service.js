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
