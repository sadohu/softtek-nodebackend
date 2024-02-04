const personajeRepository = require('../repository/personajeRepository');
const vehiculoRepository = require('../repository/vehiculoRepository');
const personajeVehiculoRepository = require('../repository/personajeVehiculoRepository');

/**
 * Valida los atributos extras de un personaje
 * @param {*} personaje
 * @param {*} reject Error si el personaje no tiene los atributos requeridos
 * @returns Detiene la ejecucion si el personaje no tiene los atributos requeridos
 */
const validExtrasAttributes = (personaje, resolve, reject) => {
    if (personaje.peliculas === undefined) {
        reject(new Error("Parametro de peliculas es requerido"));
        return;
    }
    if (personaje.especie === undefined) {
        reject(new Error("Parametro de especie es requerido"));
        return;
    }
    if (personaje.vehiculos === undefined) {
        reject(new Error("Parametro de vehiculos es requerido"));
        return;
    }
    if (personaje.navesEspaciales === undefined) {
        reject(new Error("Parametro de navesEspaciales es requerido"));
        return;
    }
};

const getAllPersonajes = async () => {
    return new Promise(async (resolve, reject) => {
        await personajeRepository.findAll()
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });

};

/**
 * Busca un personaje por su url
 * @param {*} url Url del personaje
 * @returns Objeto del personaje encontrado
 */
const personajeFindByUrl = async (url) => {
    return new Promise(async (resolve, reject) => {
        await personajeRepository.findByUrl(url)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};

/**
 * Busca un personaje por su id
 * @param {*} id Id del personaje
 * @returns Objeto del personaje encontrado
 */
const personajeFindById = async (id) => {
    return new Promise(async (resolve, reject) => {
        await personajeRepository.findById(id)
            .then((result) => resolve(result[0]))
            .catch((error) => reject(error));
    });

};

/**
 * Crea un personaje
 * @param {*} personaje Objeto del personaje a crear
 * @returns Id del personaje creado
 */
const personajeCreate = async (personaje) => {
    return new Promise(async (resolve, reject) => {
        await personajeRepository.create(personaje)
            .then((result) => resolve(result.insertId))
            .catch((error) => reject(error));
    });
};

/**
 * Busca un vehiculo por su url
 * @param {*} url Url del vehiculo
 * @returns Objeto del vehiculo encontrado
 */
const vehiculoFindByUrl = async (url) => {
    return new Promise(async (resolve, reject) => {
        await vehiculoRepository.findByUrl(url)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
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
            .catch((error) => reject(error));
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
            .catch((error) => reject(error));
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
            .catch((error) => reject(error));
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
            console.log("element", element);
            console.log("newPersonaje.idPersonaje", personaje.idPersonaje);
            const personajeVehiculo = { idPersonaje: personaje.idPersonaje, idVehiculo: element.idVehiculo };
            const inserted = await personajeVehiculoRepository.create(personajeVehiculo)
                .then((result) => result)
                .catch((error) => reject(error));
        }
    });

};

module.exports = {
    validExtrasAttributes,
    getAllPersonajes,
    personajeFindByUrl,
    personajeFindById,
    personajeCreate,
    vehiculoFindByUrl,
    vehiculoCreate,
    getIdVehiculos,
    getListVehiculos,
    personajeVehiculoCreate,
    vehiculosBindToPersonaje,
};