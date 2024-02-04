const especieRepository = require('../repository/especieRepository');
const personajeEspecieRepository = require('../repository/personajeEspecieRepository');

/**
 * Busca un especie por su url
 * @param {*} url Url del especie
 * @returns Objeto del especie encontrado
 */
const getByUrl = async (url) => {
    return new Promise(async (resolve, reject) => {
        await especieRepository.findByUrl(url)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};

/**
 * Busca un especie por su id
 * @param {*} id Id del especie
 * @returns Objeto del especie encontrado
 */
const getById = async (id) => {
    return new Promise(async (resolve, reject) => {
        await especieRepository.findById(id)
            .then((result) => resolve(result[0]))
            .catch((error) => reject(error));
    });
};

/**
 * Crea un especie
 * @param {*} especie Objeto del especie a crear
 * @returns Id del especie creado
 */
const create = async (especie) => {
    return new Promise(async (resolve, reject) => {
        await especieRepository.create(especie)
            .then((result) => resolve(result.insertId))
            .catch((error) => reject(error));
    });
};

/**
 * Crea un registro en la tabla personaje_especie
 * @param {*} personajeEspecie Objeto con el id del personaje y el id del especie
 * @returns Objeto con el resultado de la insercion
 */
const personajeEspecieCreate = async (personajeEspecie) => {
    return new Promise(async (resolve, reject) => {
        await personajeEspecieRepository.create(personajeEspecie)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};

/**
 * Asocia las especies a un personaje
 * @param {*} personaje Objeto del personaje
 * @param {*} especieList Array de especies
 */
const especiesBindToPersonaje = async (personaje, especieList) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const element of especieList) {
                const personajeEspecie = {
                    idPersonaje: personaje.idPersonaje,
                    idEspecie: element.idEspecie
                };
                const inserted = await personajeEspecieRepository.create(personajeEspecie)
                    .then((result) => result)
                    .catch((error) => reject(new Error(error)));
            }
            resolve(true);
        } catch (error) {
            reject(new Error(error));
        }
    });
};

/**
 * Obtiene los id de los especies
 * @param {*} especies Url de los especies
 * comprueba por cada elemeto si ya existen en la base de datos
 * de ser no existir, lo crea y lo agrega al array de Ids
 * de existir, obtiene su id y lo agrega al array de Ids
 * @returns Array de id de los especies
 */
const getIdEspecies = async (especies) => {
    let idEspecies = [];
    for (const element of especies) {
        const existEspecie = await getByUrl(element);
        if (existEspecie.length === 0) {
            const obj = { url: element };
            const idInserted = await create(obj);
            idEspecies.push(idInserted);
        } else {
            idEspecies.push(existEspecie[0].idEspecie);
        }
    }
    return idEspecies;
};

/**
 * Obtiene los especies insertados
 * @param {*} idEspecies Array de id de los especies
 * obtiene los especies por su id y los agrega a un array
 * @returns Array de especies insertados
 */
const getListEspecies = async (idEspecies) => {
    let listEspecies = [];
    for (const element of idEspecies) {
        const existEspecie = await getById(element);
        listEspecies.push(existEspecie);
    }
    return listEspecies;
};


module.exports = {
    getByUrl,
    getById,
    create,
    especiesBindToPersonaje,
    getIdEspecies,
    getListEspecies,
};