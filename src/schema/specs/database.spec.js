import { UserMovie, UserSerie, LastItem, Date } from '../database';

describe('SCHEMA DATA BASE', () => {
    describe('UserMovie', () => {
        it('should match snapshot', () => {
            expect(UserMovie).toMatchSnapshot();
        });
    });
    describe('UserSerie', () => {
        it('should match snapshot', () => {
            expect(UserSerie).toMatchSnapshot();
        });
    });
    describe('LastItem', () => {
        it('should match snapshot', () => {
            expect(LastItem).toMatchSnapshot();
        });
    });
    describe('Date', () => {
        it('should match snapshot', () => {
            expect(Date).toMatchSnapshot();
        });
    });
});