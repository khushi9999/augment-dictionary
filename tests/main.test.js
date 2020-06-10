const updateDictionary = require('../index').updateDictionary;

describe('Augment Dictionary', () => {
    it('should not update anything', () => {
        const input = {'2014-01-01': 100, '2014-01-02': 110};
        const output = updateDictionary(input);
        expect(output['2014-01-01']).toBe(100);
        expect(output['2014-01-02']).toBe(110);
    });

    it('should add new positive range', () => {
        const input = {'2019-01-01': 100, '2019-01-04': 115};
        const output = updateDictionary(input);
        expect(output['2019-01-01']).toBe(100);
        expect(output['2019-01-02']).toBe(105);
        expect(output['2019-01-03']).toBe(110);
        expect(output['2019-01-04']).toBe(115);
    });

    it('should add new negative range', () => {
        const input = {'2019-01-10': 10, '2019-01-11': 20, '2019-01-13': 10};
        const output = updateDictionary(input);
        expect(output['2019-01-10']).toBe(10);
        expect(output['2019-01-11']).toBe(20);
        expect(output['2019-01-12']).toBe(15);
        expect(output['2019-01-13']).toBe(10);
    })
});