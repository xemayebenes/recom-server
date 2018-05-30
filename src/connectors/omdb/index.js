import fetch from 'node-fetch';

const API_KEY = 'a3d09618';

const DATA_REQUEST_URL = 'http://www.omdbapi.com/';


const generateMovieUriRequest = id =>
    `${DATA_REQUEST_URL}?i=${id}&apikey=${API_KEY}`;

const generateSerieUriRequest = title =>
    `${DATA_REQUEST_URL}?t=${title}&apikey=${API_KEY}`;

export const fetchOMDBMovie = id =>
    fetch(generateMovieUriRequest(id))
    .then(response => response.json());

export const fetchOMDBSerie = title =>
    fetch(generateSerieUriRequest(title))
    .then(response => response.json())