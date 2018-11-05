import { RESTDataSource } from 'apollo-datasource-rest';
import {
  transformFilmData,
  normalizeItemData,
  transformVideoData,
  transformSerieData,
  normalizeTVData
} from './utils';

const DATA_REQUEST_URL = 'https://api.themoviedb.org/3/';
const SEARCH_PATH = 'search/movie';
const MOVIE_PATH = 'movie';
const SEARCH_TV_PATH = 'search/tv';
const TV_PATH = 'tv';

export default class MovieDataBaseAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = DATA_REQUEST_URL;
  }

  willSendRequest(request) {
    request.params.set('api_key', 'aef9a2eff559d403c028eac5d3acf757');
  }

  searchFilm = async (searchText, language = 'es') =>
    this.get(SEARCH_PATH, {
      language,
      query: encodeURI(searchText)
    }).then(transformFilmData);

  getMovie = async (id, language = 'es') =>
    this.get(`${MOVIE_PATH}/${id}`, { language }).then(normalizeItemData);

  getVideoData = async id =>
    this.get(`${MOVIE_PATH}/${id}/videos`).then(transformVideoData);

  searchSerie = async (searchText, language = 'es') =>
    this.get(SEARCH_TV_PATH, {
      language,
      query: encodeURI(searchText)
    }).then(transformSerieData);

  getSerie = async (id, language = 'es') =>
    this.get(`${TV_PATH}/${id}`, { language }).then(normalizeTVData);

  getSerieVideoData = async id =>
    this.get(`${TV_PATH}/${id}/videos`).then(transformVideoData);
}
