const personajeRepository = require('../repository/personajeRepository');

/**
 * Valida los atributos extras de un personaje
 * @param {*} personaje
 * @param {*} reject Error si el personaje no tiene los atributos requeridos
 * @returns Detiene la ejecucion si el personaje no tiene los atributos requeridos
 */
const validExtrasAttributes = (personaje) => {
    if (personaje.peliculas === undefined) {
        throw Error("Parametro de peliculas es requerido");
    }
    if (personaje.especie === undefined) {
        throw Error("Parametro de especie es requerido");
    }
    if (personaje.vehiculos === undefined) {
        throw Error("Parametro de vehiculos es requerido");
    }
    if (personaje.navesEspaciales === undefined) {
        throw Error("Parametro de navesEspaciales es requerido");
    }
};

const getAllPersonajes = async () => {
    return new Promise(async (resolve, reject) => {
        await personajeRepository.findAll()
            .then((result) => resolve(result))
            .catch((error) => reject(new Error(error)));
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
            .catch((error) => reject(new Error(error)));
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
            .catch((error) => reject(new Error(error)));
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
            .catch((error) => reject(new Error(error)));
    });
};

module.exports = {
    validExtrasAttributes,
    getAllPersonajes,
    personajeFindByUrl,
    personajeFindById,
    personajeCreate,
};