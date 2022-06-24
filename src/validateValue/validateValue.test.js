const validateValue = require('./validateValue.js')


describe('validateValue', () =>{
    test('Корректное значение', ()=> {
        expect(validateValue(50)).toBe(true)
    })
    test('Меньше корректного', ()=> {
        expect(validateValue(-1)).toBe(false)
    })
    test('ВБольше корректного', ()=> {
        expect(validateValue(101)).toBe(false)
    })
    test('Пограничное снизу', ()=> {
        expect(validateValue(0)).toBe(false)
    })
    test('Пограничное сверху', ()=> {
        expect(validateValue(100)).toBe(true)
    })
})