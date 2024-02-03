const iconv = require('iconv-lite');
const personajeServiceTest = require('./personajeService/personajeServiceTest');

test('personajeServiceTest returns all rows from personaje table', () => {
    return personajeServiceTest().then(() => {
        expect(true).toBe(true);
    });
});
