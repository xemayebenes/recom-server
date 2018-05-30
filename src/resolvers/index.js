import {
    FortuneCookie,
    searchFilm,
    searchSeries,
    fetchMovie,
    fetchVideoData,
    fetchSerie,
    fetchSerieVideoData,
    fetchOMDBMovie,
    fetchOMDBSerie
} from '../connectors';

const resolvers = {
    Query: {
        getFortuneCookie() {
            return FortuneCookie.getOne()
        },
        searchFilms(_, { searchText, language }) {
            return searchFilm(searchText, language)
        },
        searchSeries(_, { searchText, language }) {
            return searchSeries(searchText, language)
        },
        getMDBFilm(_, { id, language }) {
            return fetchMovie(id, language)
        },
        getMDBSerie(_, { id, language }) {
            return fetchSerie(id, language)
        },
        getOMDBFilm(_, { id }) {
            return fetchOMDBMovie(id)
        },
        getOMDBSerie(_, { title }) {
            return fetchOMDBSerie(title)
        },
    },
    FilmMDB: {
        videoData(filmMDB) {
            return fetchVideoData(filmMDB.externalId)
        },
        omdbData(filmMDB) {
            return fetchOMDBMovie(filmMDB.imdb_id)
        }
    },
    SerieMDB: {
        videoData(serieMDB) {
            return fetchSerieVideoData(serieMDB.externalId)
        },
        omdbData(serieMDB) {
            return fetchOMDBSerie(serieMDB.name)
        }
    }
};
export default resolvers;