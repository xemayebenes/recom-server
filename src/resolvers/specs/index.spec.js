import Resolvers from '../index';

describe('CONNECTOR MOVIE DATA BASE', () => {
    let resolvers;
    const connectors = {
        movieDataBaseService: {
            searchFilm: jest.fn(),
            searchSeries: jest.fn(),
            fetchMovie: jest.fn(),
            fetchSerie: jest.fn(),
            fetchVideoData: jest.fn(),
            fetchSerieVideoData: jest.fn(),
        },
        dataBaseService: {
            getSeriesByUser: jest.fn(),
            getMoviesByUser: jest.fn(),
            getLastItemsByUser: jest.fn(),
            createMovie: jest.fn(),
            createSerie: jest.fn(),
            getMovieById: jest.fn(),
            getSerieById: jest.fn(),
        },
        omdbService: {
            fetchOMDBMovie: jest.fn(),
            fetchOMDBSerie: jest.fn(),
        },
    };
    const obj = {};
    let context = {};
    beforeAll(() => {
        resolvers = Resolvers({
            connectors,
        });
    });

    describe('Mutations', () => {
        describe('addMovie', () => {
            beforeEach(async() => {
                context = {
                    user: 'userId1',
                };
                await resolvers.Mutation.addMovie(obj, { externalId: 'extId11' }, context);
            });

            it('should call to connectors.dataBaseService.createMovie', () => {
                expect(connectors.dataBaseService.createMovie).toHaveBeenCalledWith('extId11', 'userId1');
            });
        });
        describe('addSerie', () => {
            beforeEach(async() => {
                context = {
                    user: 'userId1',
                };
                await resolvers.Mutation.addSerie(obj, { externalId: 'extId11' }, context);
            });

            it('should call to connectors.dataBaseService.createSerie', () => {
                expect(connectors.dataBaseService.createSerie).toHaveBeenCalledWith('extId11', 'userId1');
            });
        });
    });
    describe('Queries', () => {
        describe('searchFilms', () => {
            beforeEach(async() => {
                await resolvers.Query.searchFilms(obj, { searchText: 'text', language: 'es' });
            });

            it('should call to connectors.movieDataBaseService.searchFilm', () => {
                expect(connectors.movieDataBaseService.searchFilm).toHaveBeenCalledWith('text', 'es');
            });
        });
        describe('searchSeries', () => {
            beforeEach(async() => {
                await resolvers.Query.searchSeries(obj, { searchText: 'text', language: 'es' });
            });

            it('should call to connectors.movieDataBaseService.searchSeries', () => {
                expect(connectors.movieDataBaseService.searchSeries).toHaveBeenCalledWith('text', 'es');
            });
        });
        describe('getMovie', () => {
            beforeEach(async() => {
                await resolvers.Query.getMovie(obj, { externalId: 1, language: 'es' });
            });

            it('should call to connectors.movieDataBaseService.fetchMovie', () => {
                expect(connectors.movieDataBaseService.fetchMovie).toHaveBeenCalledWith(1, 'es');
            });
        });
        describe('getSerie', () => {
            beforeEach(async() => {
                await resolvers.Query.getSerie(obj, { externalId: 1, language: 'es' });
            });

            it('should call to connectors.movieDataBaseService.fetchSerie', () => {
                expect(connectors.movieDataBaseService.fetchSerie).toHaveBeenCalledWith(1, 'es');
            });
        });
        describe('getUserSeries', () => {
            describe('when authorized', () => {
                beforeEach(async() => {
                    context = {
                        user: 'user1',
                    };
                    await resolvers.Query.getUserSeries(obj, { userId: 'user1' }, context);
                });

                it('should call to connectors.dataBaseService.getSeriesByUser', () => {
                    expect(connectors.dataBaseService.getSeriesByUser).toHaveBeenCalledWith('user1');
                });
            });
            describe('when unauthorized', () => {
                beforeEach(() => {
                    context = {
                        user: 'other',
                    };
                });

                it('should throw not authorized error', () => {
                    expect(() => resolvers.Query.getUserSeries(obj, { userId: 'user1' }, context))
                        .toThrowError();
                });
            });
        });
        describe('getUserMovies', () => {
            describe('when authorized', () => {
                beforeEach(async() => {
                    context = {
                        user: 'user1',
                    };
                    await resolvers.Query.getUserMovies(obj, { userId: 'user1' }, context);
                });

                it('should call to connectors.dataBaseService.getMoviesByUser', () => {
                    expect(connectors.dataBaseService.getMoviesByUser).toHaveBeenCalledWith('user1');
                });
            });
            describe('when unauthorized', () => {
                beforeEach(() => {
                    context = {
                        user: 'other',
                    };
                });

                it('should throw not authorized error', () => {
                    expect(() => resolvers.Query.getUserMovies(obj, { userId: 'user1' }, context))
                        .toThrowError();
                });
            });
        });
        describe('getUserLastItems', () => {
            describe('when authorized', () => {
                beforeEach(async() => {
                    context = {
                        user: 'user1',
                    };
                    await resolvers.Query.getUserLastItems(obj, { userId: 'user1' }, context);
                });

                it('should call to connectors.dataBaseService.getLastItemsByUser', () => {
                    expect(connectors.dataBaseService.getLastItemsByUser).toHaveBeenCalledWith('user1');
                });
            });
            describe('when unauthorized', () => {
                beforeEach(() => {
                    context = {
                        user: 'other',
                    };
                });

                it('should throw not authorized error', () => {
                    expect(() => resolvers.Query.getUserLastItems(obj, { userId: 'user1' }, context))
                        .toThrowError();
                });
            });
        });
        describe('getUserMovie', () => {
            describe('when authorized', () => {
                beforeEach(async() => {
                    context = {
                        user: 'user1',
                    };
                    await resolvers.Query.getUserMovie(obj, { userId: 'user1', id: 'movieId1' }, context);
                });

                it('should call to connectors.dataBaseService.getMovieById', () => {
                    expect(connectors.dataBaseService.getMovieById).toHaveBeenCalledWith('movieId1');
                });
            });
            describe('when unauthorized', () => {
                beforeEach(() => {
                    context = {
                        user: 'other',
                    };
                });

                it('should throw not authorized error', () => {
                    expect(() => resolvers.Query.getUserMovie(obj, { userId: 'user1', id: 'movieId1' }, context))
                        .toThrowError();
                });
            });
        });
        describe('getUserSerie', () => {
            describe('when authorized', () => {
                beforeEach(async() => {
                    context = {
                        user: 'user1',
                    };
                    await resolvers.Query.getUserSerie(obj, { userId: 'user1', id: 'serieId1' }, context);
                });

                it('should call to connectors.dataBaseService.getSerieById', () => {
                    expect(connectors.dataBaseService.getSerieById).toHaveBeenCalledWith('serieId1');
                });
            });
            describe('when unauthorized', () => {
                beforeEach(() => {
                    context = {
                        user: 'other',
                    };
                });

                it('should throw not authorized error', () => {
                    expect(() => resolvers.Query.getUserSerie(obj, { userId: 'user1', id: 'serieId1' }, context))
                        .toThrowError();
                });
            });
        });
    });
    describe('Movie', () => {
        const movie = {
            externalId: 'extId1',
            imdb_id: 'imdbId1'
        };
        describe('videoData', () => {

            beforeEach(async() => {
                await resolvers.Movie.videoData(movie);
            });

            it('should call to connectors.movieDataBaseService.fetchVideoData', () => {
                expect(connectors.movieDataBaseService.fetchVideoData).toHaveBeenCalledWith('extId1');
            });
        });
        describe('omdbData', () => {

            beforeEach(async() => {
                await resolvers.Movie.omdbData(movie);
            });

            it('should call to connectors.omdbService.fetchOMDBMovie', () => {
                expect(connectors.omdbService.fetchOMDBMovie).toHaveBeenCalledWith('imdbId1');
            });
        });
    });
    describe('Serie', () => {
        const serie = {
            externalId: 'extId1',
            name: 'name1'
        };
        describe('videoData', () => {

            beforeEach(async() => {
                await resolvers.Serie.videoData(serie);
            });

            it('should call to connectors.movieDataBaseService.fetchSerieVideoData', () => {
                expect(connectors.movieDataBaseService.fetchSerieVideoData).toHaveBeenCalledWith('extId1');
            });
        });
        describe('omdbData', () => {

            beforeEach(async() => {
                await resolvers.Serie.omdbData(serie);
            });

            it('should call to connectors.omdbService.fetchOMDBSerie', () => {
                expect(connectors.omdbService.fetchOMDBSerie).toHaveBeenCalledWith('name1');
            });
        });
    });
    describe('UserMovie', () => {
        const userMovie = {
            externalId: 'extId1',
        };
        describe('film', () => {

            beforeEach(async() => {
                await resolvers.UserMovie.film(userMovie);
            });

            it('should call to connectors.movieDataBaseService.fetchMovie', () => {
                expect(connectors.movieDataBaseService.fetchMovie).toHaveBeenCalledWith('extId1');
            });
        });
    });
    describe('UserSerie', () => {
        const userSerie = {
            externalId: 'extId1',
        };
        describe('serie', () => {

            beforeEach(async() => {
                await resolvers.UserSerie.serie(userSerie);
            });

            it('should call to connectors.movieDataBaseService.fetchSerie', () => {
                expect(connectors.movieDataBaseService.fetchSerie).toHaveBeenCalledWith('extId1');
            });
        });
    });
    describe('LastItem', () => {
        let lastItem = {};
        describe('item', () => {
            describe('where is serie', () => {

                beforeEach(async() => {
                    lastItem = {
                        item: {
                            kind: 'Serie',
                            externalId: 'extId2',
                        }
                    };
                    await resolvers.LastItem.item(lastItem);
                });

                it('should call to connectors.movieDataBaseService.fetchSerie', () => {
                    expect(connectors.movieDataBaseService.fetchSerie).toHaveBeenCalledWith('extId2');
                });
            });
            describe('where is movie', () => {

                beforeEach(async() => {
                    lastItem = {
                        item: {
                            kind: 'Movie',
                            externalId: 'extId3',
                        }
                    };
                    await resolvers.LastItem.item(lastItem);
                });

                it('should call to connectors.movieDataBaseService.fetchMovie', () => {
                    expect(connectors.movieDataBaseService.fetchMovie).toHaveBeenCalledWith('extId3');
                });
            });
        });
    });
    describe('ItemInterface', () => {
        describe('when kind is serie', () => {
            it('should return "serie"', () => {
                expect(resolvers.ItemInterface.__resolveType({ kind: 'Serie' })).toEqual('Serie');
            });
        });
        describe('when kind is Movie', () => {
            it('should return "Movie"', () => {
                expect(resolvers.ItemInterface.__resolveType({ kind: 'Movie' })).toEqual('Movie');
            });
        });
    });
    describe('Date', () => {
        let response;
        const date = "2018-06-07T17:13:25.588Z";
        beforeEach(() => {
            response = resolvers.Date;
        });
        it('should return date scalar', () => {
            expect(response.name).toEqual('Date');
            expect(response.description).toEqual('Date custom scalar type');
            expect(response.parseValue(date)).toEqual(new Date("2018-06-07T17:13:25.588Z"));
            expect(response.serialize(new Date(date))).toEqual(new Date("2018-06-07T17:13:25.588Z").getTime());
        });
    });
})