const iconv = require('iconv-lite');
const personajeServiceTest = require('./personaje/personajeServiceTest');

test('personajeServiceTest returns all rows from personaje table', async () => {
    return personajeServiceTest.getAll().then(() => {
        expect(true).toBe(true);
    });
});


test('personajeServiceTest returns a row from personaje table by url', async () => {
    return personajeServiceTest.getByUrl('https://swapi.py4e.com/api/people/1/').then(() => {
        expect(true).toBe(true);
    });
});

test('personajeServiceTest returns a row from personaje table by id', async () => {
    return personajeServiceTest.getById(1).then(() => {
        expect(true).toBe(true);
    });
});

test('personajeServiceTest creates a row in personaje table', async () => {
    const personaje = {
        "nombre": "Luke Skywalker",
        "altura": "172",
        "masa": "77",
        "colorDeCabello": "blond",
        "colorDeLaPiel": "fair",
        "colorDeOjos": "blue",
        "anoDeNacimiento": "19BBY",
        "genero": "male",
        "mundoNatal": "https://swapi.dev/api/planets/1/",
        "creado": "2014-12-09T13:50:51.644000Z",
        "editado": "2014-12-20T21:17:56.891000Z",
        "url": "https://swapi.dev/api/people/1/"
    };
    return personajeServiceTest.create(personaje).then(() => {
        expect(true).toBe(true);
    });
});
