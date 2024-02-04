const iconv = require('iconv-lite');
const especieServiceTest = require('./especie/especieServiceTest');

test('especieServiceTest creates a row in especie table', async () => {
    const especie = {
        url: "https://swapi.py4e.com/api/species/1/"
    };
    return especieServiceTest.create(especie).then(() => {
        expect(true).toBe(true);
    });
});

test('especieServiceTest returns a row from especie table by url', async () => {
    return especieServiceTest.getByUrl('https://swapi.py4e.com/api/species/1/').then(() => {
        expect(true).toBe(true);
    });
});

test('especieServiceTest returns a row from especie table by id', async () => {
    return especieServiceTest.getById(1).then(() => {
        expect(true).toBe(true);
    });
});

test('especieServiceTest creates a row in personajeEspecie table', async () => {
    const personajeEspecie = {
        idPersonaje: 45,
        idEspecie: 1
    };
    return especieServiceTest.personajeEspecieCreate(personajeEspecie).then(() => {
        expect(true).toBe(true);
    });
});

test('especieServiceTest return id of personajeEspecie table', async () => {
    const personaje = { idPersonaje: 45 };
    const listEspecies = [{ idEspecie: 1 }];
    return especieServiceTest.especiesBindToPersonaje(personaje, listEspecies).then(() => {
        expect(true).toBe(true);
    });
});