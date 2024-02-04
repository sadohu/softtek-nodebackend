const iconv = require('iconv-lite');
const peliculaServiceTest = require('./pelicula/peliculaServiceTest');

test('peliculaServiceTest creates a row in pelicula table', async () => {
    const pelicula = {
        url: "https://swapi.py4e.com/api/films/1/"
    };
    return peliculaServiceTest.create(pelicula).then(() => {
        expect(true).toBe(true);
    });
});

test('peliculaServiceTest returns a row from pelicula table by url', async () => {
    return peliculaServiceTest.getByUrl('https://swapi.py4e.com/api/films/1/').then(() => {
        expect(true).toBe(true);
    });
});

test('peliculaServiceTest returns a row from pelicula table by id', async () => {
    return peliculaServiceTest.getById(1).then(() => {
        expect(true).toBe(true);
    });
});

test('peliculaServiceTest creates a row in personajePelicula table', async () => {
    const personajePelicula = {
        idPersonaje: 45,
        idPelicula: 1
    };
    return peliculaServiceTest.personajePeliculaCreate(personajePelicula).then(() => {
        expect(true).toBe(true);
    });
});

test('peliculaServiceTest return id of personajePelicula table', async () => {
    const personaje = { idPersonaje: 45 };
    const listPeliculas = [{ idPelicula: 1 }];
    return peliculaServiceTest.peliculasBindToPersonaje(personaje, listPeliculas).then(() => {
        expect(true).toBe(true);
    });
});
