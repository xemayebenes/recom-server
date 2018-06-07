import Mutations from '../mutations';

describe('Mutations', () => {
    it('should match snapshot', () => {
        expect(Mutations).toMatchSnapshot();
    });

});