const especieRepository = require('../../repository/especieRepository');
const personajeEspecieRepository = require('../../repository/personajeEspecieRepository');

const getByUrl = async (url) => {
    return new Promise(async (resolve, reject) => {
        await especieRepository.findByUrl(url)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};

const getById = async (id) => {
    return new Promise(async (resolve, reject) => {
        await especieRepository.findById(id)
            .then((result) => resolve(result[0]))
            .catch((error) => reject(error));
    });
};

const create = async (especie) => {
    return new Promise(async (resolve, reject) => {
        await especieRepository.create(especie)
            .then((result) => resolve(result.insertId))
            .catch((error) => reject(error));
    });
};

const personajeEspecieCreate = async (personajeEspecie) => {
    return new Promise(async (resolve, reject) => {
        await personajeEspecieRepository.create(personajeEspecie)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};

const especiesBindToPersonaje = async (personaje, especieList) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const element of especieList) {
                const personajeEspecie = { idPersonaje: personaje.idPersonaje, idEspecie: element.idEspecie };
                const inserted = await personajeEspecieRepository.create(personajeEspecie)
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
    personajeEspecieCreate,
    especiesBindToPersonaje,
};