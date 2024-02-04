const navesEspacialesRepository = require('../../repository/navesEspacialesRepository');
const personajeNavesEspacialesRepository = require('../../repository/personajeNavesEspacialesRepository');

const getByUrl = async (url) => {
    return new Promise(async (resolve, reject) => {
        await navesEspacialesRepository.findByUrl(url)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};

const getById = async (id) => {
    return new Promise(async (resolve, reject) => {
        await navesEspacialesRepository.findById(id)
            .then((result) => resolve(result[0]))
            .catch((error) => reject(error));
    });
};

const create = async (nave) => {
    return new Promise(async (resolve, reject) => {
        await navesEspacialesRepository.create(nave)
            .then((result) => resolve(result.insertId))
            .catch((error) => reject(error));
    });
};

const personajeNavesEspacialesCreate = async (personajeNavesEspaciales) => {
    return new Promise(async (resolve, reject) => {
        await personajeNavesEspacialesRepository.create(personajeNavesEspaciales)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};

const navesEspacialesBindToPersonaje = async (personaje, naveList) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const element of naveList) {
                const personajeNavesEspaciales = { idPersonaje: personaje.idPersonaje, idNavesEspaciales: element.idNavesEspaciales };
                const inserted = await personajeNavesEspacialesRepository.create(personajeNavesEspaciales)
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
    personajeNavesEspacialesCreate,
    navesEspacialesBindToPersonaje,
};