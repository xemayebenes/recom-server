import { Rating, FilmOMDBData, SerieOMDBData } from '../omdb';

describe('SCHEMA OMDB', () => {
    describe('Rating', () => {
        it('should match snapshot', () => {
            expect(Rating).toMatchSnapshot();
        });
    });
    describe('FilmOMDBData', () => {
        it('should match snapshot', () => {
            expect(FilmOMDBData).toMatchSnapshot();
        });
    });
    describe('SerieOMDBData', () => {
        it('should match snapshot', () => {
            expect(SerieOMDBData).toMatchSnapshot();
        });
    });

});