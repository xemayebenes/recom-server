import { generateSearchFilmUriRequest } from '../index'

describe('generateSearchFilmUriRequest', () => {
    const expected = 'https://api.themoviedb.org/3/search/movie?api_key=aef9a2eff559d403c028eac5d3acf757&language=es&query=foo'

    it('should return the right url', () => {
        expect(generateSearchFilmUriRequest('foo', 'es')).toEqual(expected)
    })
})