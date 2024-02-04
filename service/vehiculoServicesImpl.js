const vehiculoRepository = require('../repository/vehiculoRepository');
const personajeVehiculoRepository = require('../repository/personajeVehiculoRepository');

/**
 * Busca un vehiculo por su url
 * @param {*} url Url del vehiculo
 * @returns Objeto del vehiculo encontrado
 */
const vehiculoFindByUrl = async (url) => {
    return new Promise(async (resolve, reject) => {
        await vehiculoRepository.findByUrl(url)
            .then((result) => resolve(result))
            .catch((error) => reject(new Error(error)));
    });
};

/**
 * Busca un vehiculo por su id
 * @param {*} id Id del vehiculo
 * @returns Objeto del vehiculo encontrado
 */
const vehiculoFindById = async (id) => {
    return new Promise(async (resolve, reject) => {
        await vehiculoRepository.findById(id)
            .then((result) => resolve(result[0]))
            .catch((error) => reject(new Error(error)));
    });
};

/**
 * Crea un vehiculo
 * @param {*} vehiculo Objeto del vehiculo a crear
 * @returns Id del vehiculo creado
 */
const vehiculoCreate = async (vehiculo) => {
    return new Promise(async (resolve, reject) => {
        await vehiculoRepository.create(vehiculo)
            .then((result) => resolve(result.insertId))
            .catch((error) => reject(new Error(error)));
    });
};

/**
 * Obtiene los id de los vehiculos
 * @param {*} vehiculos Url de los vehiculos
 * @returns Array de id de los vehiculos
 */
const getIdVehiculos = async (vehiculos) => {
    let idVehiculos = [];
    for (const element of vehiculos) {
        const existVehiculo = await vehiculoFindByUrl(element);
        if (existVehiculo.length === 0) {
            const obj = { url: element };
            const idInserted = await vehiculoCreate(obj);
            idVehiculos.push(idInserted);
        } else {
            idVehiculos.push(existVehiculo[0].idVehiculo);
        }
    }
    return idVehiculos;
};

/**
 * Obtiene los vehiculos insertados
 * @param {*} idVehiculos Array de id de los vehiculos
 * @returns Array de vehiculos insertados
 */
const getListVehiculos = async (idVehiculos) => {
    let listVehiculos = [];
    for (const element of idVehiculos) {
        const vehiculo = await vehiculoFindById(element);
        listVehiculos = listVehiculos.concat(vehiculo);
    }
    return listVehiculos;
};

/**
 * Crea un registro en la tabla personaje_vehiculo
 * @param {*} personajeVehiculo Objeto con el id del personaje y el id del vehiculo
 * @returns Objeto con el resultado de la insercion
 */
const personajeVehiculoCreate = async (personajeVehiculo) => {
    return new Promise(async (resolve, reject) => {
        await personajeVehiculoRepository.create(personajeVehiculo)
            .then((result) => resolve(result))
            .catch((error) => reject(new Error(error)));
    });

};

/**
 * Asocia los vehiculos a un personaje
 * @param {*} personaje Objeto del personaje
 * @param {*} vehiculoList Array de vehiculos
 */
const vehiculosBindToPersonaje = async (personaje, vehiculoList) => {
    return new Promise(async (resolve, reject) => {
        for (const element of vehiculoList) {
            const personajeVehiculo = { idPersonaje: personaje.idPersonaje, idVehiculo: element.idVehiculo };
            const inserted = await personajeVehiculoRepository.create(personajeVehiculo)
                .then((result) => result)
                .catch((error) => reject(new Error(error)));
        }
    });

};

module.exports = {
    vehiculoFindByUrl,
    vehiculoCreate,
    getIdVehiculos,
    getListVehiculos,
    personajeVehiculoCreate,
    vehiculosBindToPersonaje,
};