import nock from 'nock';
import Omdb from '../omdb/index'

describe('CONNECTOR OPEN MOVIE DATA BASE', () => {
    let omdb;
    const host = 'http://www.omdbapi.com/';
    const apiKeyTest = 'apiKeyTest';
    beforeAll(() => {
        omdb = Omdb({
            apiKey: apiKeyTest,
        });
    });
    describe('generate urls', () => {
        describe('generateMovieUriRequest', () => {
            const expected = 'http://www.omdbapi.com/?i=id1&apikey=apiKeyTest';

            it('should return the right url', () => {
                expect(omdb.generateMovieUriRequest('id1')).toEqual(expected);
            });
        });
        describe('generateSerieUriRequest', () => {
            const expected = 'http://www.omdbapi.com/?t=searchText&apikey=apiKeyTest';

            it('should return the right url', () => {
                expect(omdb.generateSerieUriRequest('searchText')).toEqual(expected);
            });
        });
    });
    describe('fetch functions', () => {
        describe('fetchOMDBMovie', () => {
            const response = {
                "Title": "Westworld",
                "Year": "2016–",
                "Rated": "TV-MA",
                "Released": "02 Oct 2016",
                "Runtime": "62 min",
                "Genre": "Drama, Mystery, Sci-Fi",
                "Director": "N/A",
                "Writer": "N/A",
                "Actors": "Evan Rachel Wood, Thandie Newton, Jeffrey Wright, James Marsden",
                "Plot": "Set at the intersection of the near future and the reimagined past, explore a world in which every human appetite can be indulged without consequence.",
                "Language": "English",
                "Country": "USA",
                "Awards": "Nominated for 3 Golden Globes. Another 29 wins & 75 nominations.",
                "Poster": "https://ia.media-imdb.com/images/M/MV5BMjM2MTA5NjIwNV5BMl5BanBnXkFtZTgwNjI2OTMxNTM@._V1_SX300.jpg",
                "Ratings": [{ "Source": "Internet Movie Database", "Value": "8.9/10" }],
                "Metascore": "N/A",
                "imdbRating": "8.9",
                "imdbVotes": "276,974",
                "imdbID": "tt0475784",
                "Type": "series",
                "totalSeasons": "2",
                "Response": "True"
            };
            const id = 'id1';
            const path = '/';
            let spy1;
            let expected;
            beforeEach(async() => {

                spy1 = jest.spyOn(omdb, 'generateMovieUriRequest');
                nock(host)
                    .get(path)
                    .query({
                        apikey: apiKeyTest,
                        i: id,
                    })
                    .reply(200, response);

                expected = await omdb.fetchOMDBMovie(id);
            });
            it('should call generateMovieUriRequest', () => {
                expect(spy1).toHaveBeenCalledWith(id);
            });

            it('should return the data', () => {
                expect(expected).toEqual(response)
            });
        });
        describe('fetchOMDBSerie', () => {
            const response = {
                "Title": "Friends",
                "Year": "1994–2004",
                "Rated": "TV-14",
                "Released": "22 Sep 1994",
                "Runtime": "22 min",
                "Genre": "Comedy, Romance",
                "Director": "N/A",
                "Writer": "David Crane, Marta Kauffman",
                "Actors": "Jennifer Aniston, Courteney Cox, Lisa Kudrow, Matt LeBlanc",
                "Plot": "Follows the personal and professional lives of six 20 to 30-something-year-old friends living in Manhattan.",
                "Language": "English, Dutch, Italian, French",
                "Country": "USA",
                "Awards": "Won 1 Golden Globe. Another 68 wins & 211 nominations.",
                "Poster": "https://ia.media-imdb.com/images/M/MV5BZDE1NjFkZmMtNGY1MC00OGFlLWFiY2MtODZlZWIyZmRkOTJiXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
                "Ratings": [{ "Source": "Internet Movie Database", "Value": "8.9/10" }],
                "Metascore": "N/A",
                "imdbRating": "8.9",
                "imdbVotes": "590,546",
                "imdbID": "tt0108778",
                "Type": "series",
                "totalSeasons": "10",
                "Response": "True"
            };
            const title = 'fiends';
            const path = '/';
            let spy1;
            let expected;
            beforeEach(async() => {

                spy1 = jest.spyOn(omdb, 'generateSerieUriRequest');
                nock(host)
                    .get(path)
                    .query({
                        apikey: apiKeyTest,
                        t: title,
                    })
                    .reply(200, response);

                expected = await omdb.fetchOMDBSerie(title);
            });
            it('should call generateMovieUriRequest', () => {
                expect(spy1).toHaveBeenCalledWith(title);
            });

            it('should return the data', () => {
                expect(expected).toEqual(response)
            });
        });
    });
});