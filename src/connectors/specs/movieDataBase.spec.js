import nock from 'nock';
import MovieDataBase from '../movieDataBase/index'

describe('CONNECTOR MOVIE DATA BASE', () => {
    let connector;
    const host = 'https://api.themoviedb.org/3/';
    const apiKeyTest = 'apiKeyTest';
    beforeAll(() => {
        connector = MovieDataBase({
            apiKey: apiKeyTest,
        });
    });

    describe('generate urls', () => {
        describe('generateSearchFilmUriRequest', () => {
            const expected = 'https://api.themoviedb.org/3/search/movie?api_key=apiKeyTest&language=es&query=foo';

            it('should return the right url', () => {
                expect(connector.generateSearchFilmUriRequest('foo', 'es')).toEqual(expected);
            });
        });

        describe('generateGetVideoTVUriRequest', () => {
            const expected = 'https://api.themoviedb.org/3/tv/id1/videos?api_key=apiKeyTest';

            it('should return the right url', () => {
                expect(connector.generateGetVideoTVUriRequest('id1')).toEqual(expected);
            });
        });
        describe('generateGetVideoMovieUriRequest', () => {
            const expected = 'https://api.themoviedb.org/3/movie/id1/videos?api_key=apiKeyTest';

            it('should return the right url', () => {
                expect(connector.generateGetVideoMovieUriRequest('id1')).toEqual(expected);
            });
        });

        describe('generateSearchTvUriRequest', () => {
            const expected = 'https://api.themoviedb.org/3/search/tv?api_key=apiKeyTest&language=es&query=foo';

            it('should return the right url', () => {
                expect(connector.generateSearchTvUriRequest('foo', 'es')).toEqual(expected);
            });
        });

        describe('generateGetMovieUriRequest', () => {
            const expected = 'https://api.themoviedb.org/3/movie/foo?api_key=apiKeyTest&language=es';

            it('should return the right url', () => {
                expect(connector.generateGetMovieUriRequest('foo', 'es')).toEqual(expected);
            });
        });

        describe('generateGeTVUriRequest', () => {
            const expected = 'https://api.themoviedb.org/3/tv/foo?api_key=apiKeyTest&language=es';

            it('should return the right url', () => {
                expect(connector.generateGeTVUriRequest('foo', 'es')).toEqual(expected);
            });
        });
    });

    describe('normalize data', () => {
        describe('normalizeItemData', () => {
            const expected = {
                other: 'other1',
                other2: 'other2',
                externalId: 'id1',
                images: {
                    main: 'https://image.tmdb.org/t/p/w342/path1',
                    secondary: 'https://image.tmdb.org/t/p/w300/path2'

                }
            };
            const data = {
                poster_path: 'path1',
                backdrop_path: 'path2',
                id: 'id1',
                other: 'other1',
                other2: 'other2'
            };
            it('should return the normalized object', () => {
                expect(connector.normalizeItemData(data)).toEqual(expected)
            });
        });
        describe('normalizeTVData', () => {
            const expected = {
                other: 'other1',
                other2: 'other2',
                externalId: 'id1',
                title: 'show name',
                images: {
                    main: 'https://image.tmdb.org/t/p/w342/path1',
                    secondary: 'https://image.tmdb.org/t/p/w300/path2'

                }
            };
            const data = {
                poster_path: 'path1',
                backdrop_path: 'path2',
                id: 'id1',
                name: 'show name',
                other: 'other1',
                other2: 'other2'
            };
            it('should return the normalized object', () => {
                expect(connector.normalizeTVData(data)).toEqual(expected)
            });
        });

        describe('normalizeVideoData', () => {
            describe('when youtube trailer exists', () => {
                const expected = {
                    other: 'other1',
                    trailer: 'https://www.youtube.com/watch?v=keyTest',
                    site: 'YouTube',
                    type: 'Trailer',
                    key: 'keyTest'
                };
                const data = {
                    other: 'other1',
                    site: 'YouTube',
                    type: 'Trailer',
                    key: 'keyTest'
                }
                it('should return the normalized object with trailer field', () => {
                    expect(connector.normalizeVideoData(data)).toEqual(expected)
                });
            });
            describe('when youtube trailer does not exist', () => {
                const expected = {
                    other: 'other1',
                    trailer: null,
                    site: 'other-site',
                    type: 'Trailer',
                    key: 'keyTest'
                };
                const data = {
                    other: 'other1',
                    site: 'other-site',
                    type: 'Trailer',
                    key: 'keyTest'
                }
                it('should return the normalized object without trailer field', () => {
                    expect(connector.normalizeVideoData(data)).toEqual(expected)
                });
            });
        });
    });

    describe('transform', () => {
        beforeEach(() => {
            connector.normalizeItemData = jest.fn();
            connector.normalizeTVData = jest.fn();
            connector.normalizeVideoData = jest.fn();
        });
        describe('transformFilmData', () => {
            describe('when the list has results', () => {
                const data = {
                    results: [{
                        poster_path: 'path1',
                        backdrop_path: 'path2',
                        id: 'id1',
                        name: 'show name',
                        other: 'other1',
                        other2: 'other2'
                    }]
                };
                beforeEach(() => {
                    connector.transformFilmData(data);
                });
                it('should call to normalizeItemData', () => {
                    expect(connector.normalizeItemData).toHaveBeenCalled();
                });
            });
            describe('when the list has not results', () => {
                const list = {
                    results: undefined
                };
                beforeEach(() => {
                    connector.transformFilmData(list);
                });
                it('should not call to normalizeItemData', () => {
                    expect(connector.normalizeItemData).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe('fetch data', () => {
        const searchResponse = {
            "page": 1,
            "results": [{
                    "poster_path": "/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
                    "adult": false,
                    "overview": "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
                    "release_date": "2012-04-25",
                    "genre_ids": [
                        878,
                        28,
                        12
                    ],
                    "id": 24428,
                    "original_title": "The Avengers",
                    "original_language": "en",
                    "title": "The Avengers",
                    "backdrop_path": "/hbn46fQaRmlpBuUrEiFqv0GDL6Y.jpg",
                    "popularity": 7.353212,
                    "vote_count": 8503,
                    "video": false,
                    "vote_average": 7.33
                },

            ],
            "total_results": 1,
            "total_pages": 1
        };
        const getMovieResponse = {
            "adult": false,
            "backdrop_path": "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
            "belongs_to_collection": null,
            "budget": 63000000,
            "genres": [{
                "id": 18,
                "name": "Drama"
            }],
            "homepage": "",
            "id": 550,
            "imdb_id": "tt0137523",
            "original_language": "en",
            "original_title": "Fight Club",
            "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
            "popularity": 0.5,
            "poster_path": null,
            "production_companies": [{
                "id": 508,
                "logo_path": "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
                "name": "Regency Enterprises",
                "origin_country": "US"
            }, ],
            "production_countries": [{
                "iso_3166_1": "US",
                "name": "United States of America"
            }],
            "release_date": "1999-10-12",
            "revenue": 100853753,
            "runtime": 139,
            "spoken_languages": [{
                "iso_639_1": "en",
                "name": "English"
            }],
            "status": "Released",
            "tagline": "How much can you know about yourself if you've never been in a fight?",
            "title": "Fight Club",
            "video": false,
            "vote_average": 7.8,
            "vote_count": 3439
        };
        const videoDataResponse = {
            "id": 550,
            "results": [{
                "id": "533ec654c3a36854480003eb",
                "iso_639_1": "en",
                "iso_3166_1": "US",
                "key": "SUXWAEX2jlg",
                "name": "Trailer 1",
                "site": "YouTube",
                "size": 720,
                "type": "Trailer"
            }]
        }
        describe('searchFilm', () => {
            const query = 'queryText';
            const path = '/search/movie';
            let spy1;
            let spy2;
            beforeEach(async() => {

                spy1 = jest.spyOn(connector, 'generateSearchFilmUriRequest');
                spy2 = jest.spyOn(connector, 'transformFilmData');
                nock(host)
                    .get(path)
                    .query({
                        api_key: apiKeyTest,
                        language: 'es',
                        query: query,
                    })
                    .reply(200, searchResponse);

                await connector.searchFilm(query);
            });
            afterEach(() => {
                spy1.mockClear();
                spy2.mockClear();
            });
            it('should call to generateSearchFilmUriRequest', () => {
                expect(spy1).toHaveBeenCalledWith(query, 'es');
            });
            it('should call to transformFilmData', () => {
                expect(spy2).toHaveBeenCalledWith(searchResponse);
            });
        });
        describe('searchSeries', () => {
            const query = 'queryText';
            const path = '/search/tv';
            let spy1;
            let spy2;
            beforeEach(async() => {

                spy1 = jest.spyOn(connector, 'generateSearchTvUriRequest');
                spy2 = jest.spyOn(connector, 'transformSerieData');
                nock(host)
                    .get(path)
                    .query({
                        api_key: apiKeyTest,
                        language: 'es',
                        query: query,
                    })
                    .reply(200, searchResponse);

                await connector.searchSeries(query);
            });
            afterEach(() => {
                spy1.mockClear();
                spy2.mockClear();
            });
            it('should call to generateSearchTvUriRequest', () => {
                expect(spy1).toHaveBeenCalledWith(query, 'es');
            });
            it('should call to transformSerieData', () => {
                expect(spy2).toHaveBeenCalledWith(searchResponse);
            });
        });
        describe('fetchMovie', () => {
            const id = 'id1';
            const path = `/movie/${id}`;
            let spy1;
            let spy2;
            beforeEach(async() => {
                spy1 = jest.spyOn(connector, 'generateGetMovieUriRequest');
                spy2 = jest.spyOn(connector, 'normalizeItemData');

                nock(host)
                    .get(path)
                    .query({
                        api_key: apiKeyTest,
                        language: 'es',
                    })
                    .reply(200, getMovieResponse);

                await connector.fetchMovie(id);
            });
            afterEach(() => {
                spy1.mockClear();
                spy2.mockClear();
            });
            it('should call to generateGetMovieUriRequest', () => {
                expect(spy1).toHaveBeenCalledWith(id, 'es');
            });
            it('should call to normalizeItemData', () => {
                expect(spy2).toHaveBeenCalledWith(getMovieResponse);
            });
        });
        describe('fetchSerie', () => {
            const id = 'id1';
            const path = `/tv/${id}`;
            let spy1;
            let spy2;
            beforeEach(async() => {
                spy1 = jest.spyOn(connector, 'generateGeTVUriRequest');
                spy2 = jest.spyOn(connector, 'normalizeTVData');

                nock(host)
                    .get(path)
                    .query({
                        api_key: apiKeyTest,
                        language: 'es',
                    })
                    .reply(200, getMovieResponse);

                await connector.fetchSerie(id);
            });
            afterEach(() => {
                spy1.mockClear();
                spy2.mockClear();
            });
            it('should call to generateGeTVUriRequest', () => {
                expect(spy1).toHaveBeenCalledWith(id, 'es');
            });
            it('should call to normalizeItemData', () => {
                expect(spy2).toHaveBeenCalledWith(getMovieResponse);
            });
        });
        describe('fetchVideoData', () => {
            const id = 'id1';
            const path = `/movie/${id}/videos`;
            let spy1;
            let spy2;
            beforeEach(async() => {
                spy1 = jest.spyOn(connector, 'generateGetVideoMovieUriRequest');
                spy2 = jest.spyOn(connector, 'transformVideoData');

                nock(host)
                    .get(path)
                    .query({
                        api_key: apiKeyTest,
                    })
                    .reply(200, videoDataResponse);

                await connector.fetchVideoData(id);
            });
            it('should call to generateGetVideoMovieUriRequest', () => {
                expect(spy1).toHaveBeenCalledWith(id);
            });
            it('should call to transformVideoData', () => {
                expect(spy2).toHaveBeenCalledWith(videoDataResponse);
            });
        });
        describe('fetchSerieVideoData', () => {
            const id = 'id1';
            const path = `/tv/${id}/videos`;
            let spy1;
            let spy2;
            beforeEach(async() => {
                spy1 = jest.spyOn(connector, 'generateGetVideoTVUriRequest');
                spy2 = jest.spyOn(connector, 'transformVideoData');

                nock(host)
                    .get(path)
                    .query({
                        api_key: apiKeyTest,
                    })
                    .reply(200, videoDataResponse);

                await connector.fetchSerieVideoData(id);
            });
            it('should call to generateGetVideoMovieUriRequest', () => {
                expect(spy1).toHaveBeenCalledWith(id);
            });
            it('should call to transformVideoData', () => {
                expect(spy2).toHaveBeenCalledWith(videoDataResponse);
            });
        });
    });
});