import Queries from '../queries';

describe('Queries', () => {
    it('should match snapshot', () => {
        expect(Queries).toMatchSnapshot();
    });

});