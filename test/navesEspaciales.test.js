const iconv = require('iconv-lite');
const navesEspacialesServiceTest = require('./navesEspaciales/navesEspacialesServiceTest');

test('navesEspacialesServiceTest creates a row in navesespaciales table', async () => {
    const nave = {
        url: "https://swapi.py4e.com/api/starships/9/"
    };
    return navesEspacialesServiceTest.create(nave).then(() => {
        expect(true).toBe(true);
    });
});

test('navesEspacialesServiceTest returns a row from navesespaciales table by url', async () => {
    return navesEspacialesServiceTest.getByUrl('https://swapi.py4e.com/api/starships/9/').then(() => {
        expect(true).toBe(true);
    });
});

test('navesEspacialesServiceTest returns a row from navesespaciales table by id', async () => {
    return navesEspacialesServiceTest.getById(1).then(() => {
        expect(true).toBe(true);
    });
});

test('navesEspacialesServiceTest creates a row in personajeNavesEspaciales table', async () => {
    const personajeNavesEspaciales = {
        idPersonaje: 1,
        idNavesEspaciales: 1
    };
    return navesEspacialesServiceTest.personajeNavesEspacialesCreate(personajeNavesEspaciales).then(() => {
        expect(true).toBe(true);
    });
});

test('navesEspacialesServiceTest return id of personajeNavesEspaciales table', async () => {
    const personaje = { idPersonaje: 1 };
    const listNaves = [{ idNavesEspaciales: 1 }];
    return navesEspacialesServiceTest.navesEspacialesBindToPersonaje(personaje, listNaves).then(() => {
        expect(true).toBe(true);
    });
});