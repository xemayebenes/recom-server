import fetch from 'node-fetch';
import { searchFilm, searchSeries, fetchMovie, fetchVideoData, fetchSerie, fetchSerieVideoData } from './movieDataBase';
import { fetchOMDBMovie, fetchOMDBSerie } from './omdb';
const FortuneCookie = {
    getOne() {
        return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie')
            .then(res => res.json())
            .then(res => {
                return res[0].fortune.message;
            });
    },
};


export { FortuneCookie, searchFilm, searchSeries, fetchMovie, fetchVideoData, fetchSerie, fetchSerieVideoData, fetchOMDBMovie, fetchOMDBSerie };