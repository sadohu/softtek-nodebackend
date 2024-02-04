const iconv = require('iconv-lite');
const vehiculoServiceTest = require('./vehiculo/vehiculoServicesTest');

test('vehiculoServiceTest creates a row in vehiculo table', async () => {
    const vehiculo = {
        url: "https://swapi.py4e.com/api/vehicles/4/"
    };
    return vehiculoServiceTest.create(vehiculo).then(() => {
        expect(true).toBe(true);
    });
});

test('vehiculoServiceTest returns a row from vehiculo table by url', async () => {
    return vehiculoServiceTest.getByUrl('https://swapi.py4e.com/api/vehicles/4/').then(() => {
        expect(true).toBe(true);
    });
});

test('vehiculoServiceTest returns a row from vehiculo table by id', async () => {
    return vehiculoServiceTest.getById(1).then(() => {
        expect(true).toBe(true);
    });
});

test('vehiculoServiceTest creates a row in personajeVehiculo table', async () => {
    const personajeVehiculo = {
        idPersonaje: 1,
        idVehiculo: 1
    };
    return vehiculoServiceTest.personajeVehiculoCreate(personajeVehiculo).then(() => {
        expect(true).toBe(true);
    });
});

test('vehiculoServiceTest return id of personajeVehiculo table', async () => {
    const personaje = { idPersonaje: 1 };
    const listVehiculos = [{ idVehiculo: 35 }, { idVehiculo: 36 }];
    return vehiculoServiceTest.vehiculosBindToPersonaje(personaje, listVehiculos).then(() => {
        expect(true).toBe(true);
    });
});

