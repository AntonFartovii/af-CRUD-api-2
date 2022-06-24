const mapArrToStrings = require('./mapArrToString.js')


describe('mapArrToString', () =>{
    test('Корректное значение', ()=> {
        expect(mapArrToStrings([1, 2, 3])).toEqual(['1','2','3']);
    })
    test('Корректное значение2', ()=> {
        expect(mapArrToStrings([1, 2, 3, null])).toEqual(['1','2','3']);
    })
    test('Корректное значение1', ()=> {
        expect(mapArrToStrings([])).toEqual([]);
    })
    test('Корректное значение33', ()=> {
        expect(mapArrToStrings([1,2,3])).not.toEqual([1,2,3]);
    })

})