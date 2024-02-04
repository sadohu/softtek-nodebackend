const personajeRepository = require('../repository/personajeRepository');

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

module.exports = {
    validExtrasAttributes,
    getAllPersonajes,
    personajeFindByUrl,
    personajeFindById,
    personajeCreate,
};