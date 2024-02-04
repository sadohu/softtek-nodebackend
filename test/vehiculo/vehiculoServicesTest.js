const vehiculoRepository = require('../../repository/vehiculoRepository');
const personajeVehiculoRepository = require('../../repository/personajeVehiculoRepository');

const getByUrl = async (url) => {
    return new Promise(async (resolve, reject) => {
        await vehiculoRepository.findByUrl(url)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};

const getById = async (id) => {
    return new Promise(async (resolve, reject) => {
        await vehiculoRepository.findById(id)
            .then((result) => resolve(result[0]))
            .catch((error) => reject(error));
    });
};

const create = async (vehiculo) => {
    return new Promise(async (resolve, reject) => {
        await vehiculoRepository.create(vehiculo)
            .then((result) => resolve(result.insertId))
            .catch((error) => reject(error));
    });
};

const personajeVehiculoCreate = async (personajeVehiculo) => {
    return new Promise(async (resolve, reject) => {
        await personajeVehiculoRepository.create(personajeVehiculo)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};

const vehiculosBindToPersonaje = async (personaje, vehiculoList) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const element of vehiculoList) {
                const personajeVehiculo = { idPersonaje: personaje.idPersonaje, idVehiculo: element.idVehiculo };
                const inserted = await personajeVehiculoRepository.create(personajeVehiculo)
                    .then((result) => result)
                    .catch((error) => reject(error));
            }
            resolve(true);
        } catch (error) {
            reject(false);
        }

    });
};

module.exports = {
    getByUrl,
    create,
    getById,
    personajeVehiculoCreate,
    vehiculosBindToPersonaje,
};