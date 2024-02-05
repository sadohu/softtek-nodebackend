const personajeRepository = require('../repository/personajeRepository');
const peliculaRepository = require('../repository/peliculaRepository');
const especieRepository = require('../repository/especieRepository');
const vehiculoRepository = require('../repository/vehiculoRepository');
const navesEspacialesRepository = require('../repository/navesEspacialesRepository');

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

/**
 * @returns Lista de personajes con sus atributos extras
 */
const getAllPersonajes = async () => {
    try {
        const personajes = await personajeRepository.findAll();
        for (const element of personajes) {
            const peliculas = await getPeliculasByIdPersonaje(element.idPersonaje);
            const especies = await getEspeciesByIdPersonaje(element.idPersonaje);
            const vehiculos = await getVehiculosByIdPersonaje(element.idPersonaje);
            const navesEspaciales = await getNavesEspacialesByIdPersonaje(element.idPersonaje);
            element.peliculas = peliculas;
            element.especies = especies;
            element.vehiculos = vehiculos;
            element.navesEspaciales = navesEspaciales;
        }
        return personajes;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Obtiene las peliculas por id del personaje
 * @param {*} idPersonaje Id del personaje
 * @returns Lista de peliculas del personaje
 */
const getPeliculasByIdPersonaje = async (idPersonaje) => {
    try {
        return await peliculaRepository.findByIdPersonaje(idPersonaje);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Obtiene las especies por id del personaje
 * @param {*} idPersonaje Id del personaje
 * @returns Lista de especies del personaje
 */
const getEspeciesByIdPersonaje = async (idPersonaje) => {
    try {
        return await especieRepository.findByIdPersonaje(idPersonaje);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Obtiene los vehiculos por id del personaje
 * @param {*} idPersonaje Id del personaje
 * @returns Lista de vehiculos del personaje
 */
const getVehiculosByIdPersonaje = async (idPersonaje) => {
    try {
        return await vehiculoRepository.findByIdPersonaje(idPersonaje);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Obtiene las navesEspaciales por id del personaje
 * @param {*} idPersonaje Id del personaje
 * @returns Lista de navesEspaciales del personaje
 */
const getNavesEspacialesByIdPersonaje = async (idPersonaje) => {
    try {
        return await navesEspacialesRepository.findByIdPersonaje(idPersonaje);
    } catch (error) {
        throw new Error(error);
    }
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
    getPeliculasByIdPersonaje,
};