import fetch from 'node-fetch';

const API_KEY = 'aef9a2eff559d403c028eac5d3acf757';
const DATA_REQUEST_URL = 'https://api.themoviedb.org/3/';
const SEARCH_PATH = 'search/movie?';
const SEARCHTV_PATH = 'search/tv?';
const MOVIE_PATH = 'movie/';
const TV_PATH = 'tv/';
const FIND_PATH = 'find/';

export const BACKDROP_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w300/';
export const POSTER_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w342/';

export const generateSearchFilmUriRequest = (searchText, language) =>
    `${DATA_REQUEST_URL}${SEARCH_PATH}api_key=${API_KEY}&language=${language}&query=${encodeURI(searchText)}`;

const generateSearchTvUriRequest = (searchText, language) =>
    `${DATA_REQUEST_URL}${SEARCHTV_PATH}api_key=${API_KEY}&language=${language}&query=${encodeURI(searchText)}`;

const generateGetMovieUriRequest = (id, language) =>
    `${DATA_REQUEST_URL}${MOVIE_PATH}${id}?api_key=${API_KEY}&language=${language}`;

const generateGeTVUriRequest = (id, language) =>
    `${DATA_REQUEST_URL}${TV_PATH}${id}?api_key=${API_KEY}&language=${language}`;

const generateGetVideoMovieUriRequest = (id) =>
    `${DATA_REQUEST_URL}${MOVIE_PATH}${id}/videos?api_key=${API_KEY}`;

const generateGetVideoTVUriRequest = (id) =>
    `${DATA_REQUEST_URL}${TV_PATH}${id}/videos?api_key=${API_KEY}`;

const normalizeItemData = ({ poster_path, backdrop_path, id, ...rest }) => ({
    ...rest,
    externalId: id,
    images: {
        main: POSTER_BASE_IMAGE_URL + poster_path,
        secondary: BACKDROP_BASE_IMAGE_URL + backdrop_path,
    },
});

const normalizeTVData = ({ poster_path, backdrop_path, id, name, ...rest }) => ({
    ...rest,
    externalId: id,
    title: name,
    images: {
        main: POSTER_BASE_IMAGE_URL + poster_path,
        secondary: BACKDROP_BASE_IMAGE_URL + backdrop_path,
    },
});

const normalizeVideoData = (data) => ({
    ...data,
    trailer: data.site === 'YouTube' && data.type === 'Trailer' ? `https://www.youtube.com/watch?v=${data.key}` : null

})

const transformFilmData = (list) => list.results ? list.results.map(normalizeItemData) : [];
const transformSerieData = (list) => list.results ? list.results.map(normalizeTVData) : [];
const transformVideoData = (list) => list.results ? list.results.map(data => ({ id: list.id, ...normalizeVideoData(data) })) : [];

export const searchFilm = (searchText, language = 'es') =>
    fetch(generateSearchFilmUriRequest(searchText, language))
    .then(response => response.json())
    .then(transformFilmData)
    .catch(error => {
        console.error(error);
    })
export const fetchMovie = (id, language = 'es') =>
    fetch(generateGetMovieUriRequest(id, language))
    .then(response => response.json())
    .then(normalizeItemData)

export const fetchSerie = (id, language = 'es') =>
    fetch(generateGeTVUriRequest(id, language))
    .then(response => response.json())
    .then(normalizeItemData)

export const fetchVideoData = (movieId) =>
    fetch(generateGetVideoMovieUriRequest(movieId))
    .then(response => response.json())
    .then(transformVideoData)

export const fetchSerieVideoData = (serieId) =>
    fetch(generateGetVideoTVUriRequest(serieId))
    .then(response => response.json())
    .then(transformVideoData)

export const searchSeries = (searchText, language = 'es') =>
    fetch(generateSearchTvUriRequest(searchText, language))
    .then(response => response.json())
    .then(transformSerieData)
    .catch(error => {
        console.error(error);
    });