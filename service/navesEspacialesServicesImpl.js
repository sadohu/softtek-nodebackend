const navesEspacialesRepository = require('../repository/navesEspacialesRepository');
const personajeNavesEspacialesRepository = require('../repository/personajeNavesEspacialesRepository');

/**
 * Busca un navesEspaciales por su url
 * @param {*} url Url del navesEspaciales
 * @returns Objeto del navesEspaciales encontrado
 */
const getByUrl = async (url) => {
    return new Promise(async (resolve, reject) => {
        await navesEspacialesRepository.findByUrl(url)
            .then((result) => resolve(result))
            .catch((error) => reject(new Error(error)));
    });
};

/**
 * Busca un navesEspaciales por su id
 * @param {*} id Id del navesEspaciales
 * @returns Objeto del navesEspaciales encontrado
 */

const getById = async (id) => {
    return new Promise(async (resolve, reject) => {
        await navesEspacialesRepository.findById(id)
            .then((result) => resolve(result[0]))
            .catch((error) => reject(new Error(error)));
    });
};

/**
 * Crea un navesEspaciales
 * @param {*} navesEspaciales Objeto del navesEspaciales a crear
 * @returns Id del navesEspaciales creado
 */
const create = async (navesEspaciales) => {
    return new Promise(async (resolve, reject) => {
        await navesEspacialesRepository.create(navesEspaciales)
            .then((result) => resolve(result.insertId))
            .catch((error) => reject(new Error(error)));
    });
};

/**
 * Crea un registro en la tabla personaje_navesEspaciales
 * @param {*} personajeNavesEspaciales Objeto con el id del personaje y el id del navesEspaciales
 * @returns Objeto con el resultado de la insercion
 */
const personajeNavesEspacialesCreate = async (personajeNavesEspaciales) => {
    return new Promise(async (resolve, reject) => {
        await personajeNavesEspacialesRepository.create(personajeNavesEspaciales)
            .then((result) => resolve(result))
            .catch((error) => reject(new Error(error)));
    });
};

/**
 * Asocia las navesEspaciales a un personaje
 * @param {*} personaje Objeto del personaje
 * @param {*} navesEspacialesList Array de navesEspaciales
 */
const navesEspacialesBindToPersonaje = async (personaje, navesEspacialesList) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const element of navesEspacialesList) {
                const personajeNavesEspaciales = {
                    idPersonaje: personaje.idPersonaje,
                    idNavesEspaciales: element.idNavesEspaciales
                };
                const inserted = await personajeNavesEspacialesCreate(personajeNavesEspaciales)
                    .then((result) => resolve(result))
                    .catch((error) => reject(new Error(error)));
            }

            resolve(true);
        } catch (error) {
            reject(new Error(error));
        }
    });
};

/**
 * Obtiene los id de los navesEspaciales
 * @param {*} navesEspaciales Url de los navesEspaciales
 * comprueba por cada elemeto si ya existen en la base de datos
 * de ser no existir, lo crea y lo agrega al array de Ids
 * de existir, obtiene su id y lo agrega al array de Ids
 * @returns Array de id de los navesEspaciales
 */
const getIdNavesEspaciales = async (navesEspaciales) => {
    let idNavesEspaciales = [];
    for (const element of navesEspaciales) {
        const existsNavesEspaciales = await getByUrl(element);
        if (existsNavesEspaciales.length === 0) {
            const obj = { url: element };
            const idInserted = await create(obj);
            idNavesEspaciales.push(idInserted);
        } else {
            idNavesEspaciales.push(existsNavesEspaciales[0].idNavesEspaciales);
        }
    }
    return idNavesEspaciales;
};

/**
 * Obtiene las navesEspaciales insertados
 * @param {*} idNavesEspaciales Array de id de las navesEspaciales
 * obtiene los navesEspaciales por su id y los agrega a un array
 * @returns Array de navesEspaciales insertados
 */
const getListNavesEspaciales = async (idNavesEspaciales) => {
    let listNavesEspaciales = [];
    for (const element of idNavesEspaciales) {
        const existsNavesEspaciales = await getById(element);
        listNavesEspaciales.push(existsNavesEspaciales);
    }
    return listNavesEspaciales;
};

module.exports = {
    getByUrl,
    getById,
    create,
    navesEspacialesBindToPersonaje,
    personajeNavesEspacialesCreate,
    getIdNavesEspaciales,
    getListNavesEspaciales,
};