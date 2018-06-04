import fetch from 'node-fetch';

const DATA_REQUEST_URL = 'https://api.themoviedb.org/3/';
const SEARCH_PATH = 'search/movie?';
const SEARCHTV_PATH = 'search/tv?';
const MOVIE_PATH = 'movie/';
const TV_PATH = 'tv/';
const FIND_PATH = 'find/';

export const BACKDROP_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w300/';
export const POSTER_BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w342/';

export default ({
    apiKey = 'aef9a2eff559d403c028eac5d3acf757',
}) => {
    const connector = {}

    connector.generateSearchFilmUriRequest = (searchText, language) =>
        `${DATA_REQUEST_URL}${SEARCH_PATH}api_key=${apiKey}&language=${language}&query=${encodeURI(searchText)}`;

    connector.generateSearchTvUriRequest = (searchText, language) =>
        `${DATA_REQUEST_URL}${SEARCHTV_PATH}api_key=${apiKey}&language=${language}&query=${encodeURI(searchText)}`;

    connector.generateGetMovieUriRequest = (id, language) =>
        `${DATA_REQUEST_URL}${MOVIE_PATH}${id}?api_key=${apiKey}&language=${language}`;

    connector.generateGeTVUriRequest = (id, language) =>
        `${DATA_REQUEST_URL}${TV_PATH}${id}?api_key=${apiKey}&language=${language}`;

    connector.generateGetVideoMovieUriRequest = (id) =>
        `${DATA_REQUEST_URL}${MOVIE_PATH}${id}/videos?api_key=${apiKey}`;

    connector.generateGetVideoTVUriRequest = (id) =>
        `${DATA_REQUEST_URL}${TV_PATH}${id}/videos?api_key=${apiKey}`;

    connector.normalizeItemData = ({ poster_path, backdrop_path, id, ...rest }) => ({
        ...rest,
        externalId: id,
        images: {
            main: POSTER_BASE_IMAGE_URL + poster_path,
            secondary: BACKDROP_BASE_IMAGE_URL + backdrop_path,
        },
    });

    connector.normalizeTVData = ({ poster_path, backdrop_path, id, name, ...rest }) => ({
        ...rest,
        externalId: id,
        title: name,
        images: {
            main: POSTER_BASE_IMAGE_URL + poster_path,
            secondary: BACKDROP_BASE_IMAGE_URL + backdrop_path,
        },
    });

    connector.normalizeVideoData = (data) => ({
        ...data,
        trailer: data.site === 'YouTube' && data.type === 'Trailer' ? `https://www.youtube.com/watch?v=${data.key}` : null

    })

    connector.transformFilmData = (list) => list.results ? list.results.map(connector.normalizeItemData) : [];
    connector.transformSerieData = (list) => list.results ? list.results.map(connector.normalizeTVData) : [];
    connector.transformVideoData = (list) => list.results ? list.results.map(data => ({ id: list.id, ...connector.normalizeVideoData(data) })) : [];

    connector.searchFilm = (searchText, language = 'es') =>
        fetch(connector.generateSearchFilmUriRequest(searchText, language))
        .then(response => response.json())
        .then(connector.transformFilmData)
        .catch(error => {
            console.error(error);
        })
    connector.fetchMovie = (id, language = 'es') =>
        fetch(connector.generateGetMovieUriRequest(id, language))
        .then(response => response.json())
        .then(connector.normalizeItemData)

    connector.fetchSerie = (id, language = 'es') =>
        fetch(connector.generateGeTVUriRequest(id, language))
        .then(response => response.json())
        .then(connector.normalizeItemData)

    connector.fetchVideoData = (movieId) =>
        fetch(connector.generateGetVideoMovieUriRequest(movieId))
        .then(response => response.json())
        .then(connector.transformVideoData)

    connector.fetchSerieVideoData = (serieId) =>
        fetch(connector.generateGetVideoTVUriRequest(serieId))
        .then(response => response.json())
        .then(connector.transformVideoData)

    connector.searchSeries = (searchText, language = 'es') =>
        fetch(connector.generateSearchTvUriRequest(searchText, language))
        .then(response => response.json())
        .then(connector.transformSerieData)
        .catch(error => {
            console.error(error);
        });
    return connector;
}