import Connectors from '../index'
import MovieDataBase from '../movieDataBase/index'
import Omdb from '../omdb/index'

describe('CONNECTORS ', () => {
    let connectors;
    let movieDataBase;
    let omdb;
    beforeAll(() => {
        movieDataBase = MovieDataBase({
            apiKey: '',
        });
        omdb = Omdb({
            apiKey: 'apiKeyTest',
        });
        connectors = Connectors({
            movieDataBaseService: movieDataBase,
            omdbService: omdb
        });
    });

    it('movieDataService functions should be defined', () => {
        expect(connectors.movieDataBaseService).toBeDefined();
        expect(connectors.movieDataBaseService.searchFilm).toBeDefined();
        expect(connectors.movieDataBaseService.fetchMovie).toBeDefined();
        expect(connectors.movieDataBaseService.fetchSerie).toBeDefined();
        expect(connectors.movieDataBaseService.fetchVideoData).toBeDefined();
        expect(connectors.movieDataBaseService.fetchSerieVideoData).toBeDefined();
        expect(connectors.movieDataBaseService.searchSeries).toBeDefined();
    });
    it('omdbService functions should be defined', () => {
        expect(connectors.omdbService).toBeDefined();
        expect(connectors.omdbService.fetchOMDBMovie).toBeDefined();
        expect(connectors.omdbService.fetchOMDBSerie).toBeDefined();
    });
});