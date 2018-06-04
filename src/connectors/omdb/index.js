import fetch from 'node-fetch';

const DATA_REQUEST_URL = 'http://www.omdbapi.com/';


export default ({
    apiKey = 'a3d09618',
}) => {
    const connector = {}
    connector.generateMovieUriRequest = id =>
        `${DATA_REQUEST_URL}?i=${id}&apikey=${apiKey}`;

    connector.generateSerieUriRequest = title =>
        `${DATA_REQUEST_URL}?t=${title}&apikey=${apiKey}`;

    connector.fetchOMDBMovie = id =>
        fetch(connector.generateMovieUriRequest(id))
        .then(response => response.json());

    connector.fetchOMDBSerie = title =>
        fetch(connector.generateSerieUriRequest(title))
        .then(response => response.json());
    return connector;
}