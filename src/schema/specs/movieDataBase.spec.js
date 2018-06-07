import {
    SearchMovieItem,
    SearchSerieItem,
    ItemInterface,
    Movie,
    Serie,
    VideoData,
    Season,
    Genre,
    Images
} from '../movieDataBase';

describe('SCHEMA MOVIE DATA BASE', () => {
    describe('SearchMovieItem', () => {
        it('should match snapshot', () => {
            expect(SearchMovieItem).toMatchSnapshot();
        });
    });
    describe('SearchSerieItem', () => {
        it('should match snapshot', () => {
            expect(SearchSerieItem).toMatchSnapshot();
        });
    });
    describe('ItemInterface', () => {
        it('should match snapshot', () => {
            expect(ItemInterface).toMatchSnapshot();
        });
    });
    describe('Movie', () => {
        it('should match snapshot', () => {
            expect(Movie).toMatchSnapshot();
        });
    });
    describe('Serie', () => {
        it('should match snapshot', () => {
            expect(Serie).toMatchSnapshot();
        });
    });
    describe('VideoData', () => {
        it('should match snapshot', () => {
            expect(VideoData).toMatchSnapshot();
        });
    });
    describe('Season', () => {
        it('should match snapshot', () => {
            expect(Season).toMatchSnapshot();
        });
    });
    describe('Genre', () => {
        it('should match snapshot', () => {
            expect(Genre).toMatchSnapshot();
        });
    });
    describe('Images', () => {
        it('should match snapshot', () => {
            expect(Images).toMatchSnapshot();
        });
    });
});