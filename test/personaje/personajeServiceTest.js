const personajeRepository = require('../../repository/personajeRepository');

const getAll = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await personajeRepository.findAll()
                .then((result) => resolve(result))
                .catch((error) => reject(error));
            // data.forEach(element => {
            //     console.log(element);
            // });
            resolve(true);
        } catch (error) {
            console.log('error', error);
            reject(false);
        }
    });
};

const getByUrl = async (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await personajeRepository.findByUrl(url)
                .then((result) => resolve(result))
                .catch((error) => reject(error));
            // console.log(data);
            resolve(true);
        } catch (error) {
            console.log('error', error);
            reject(false);
        }
    });
};

const getById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await personajeRepository.findById(id)
                .then((result) => resolve(result[0]))
                .catch((error) => reject(error));
            // console.log(data);
            resolve(true);
        } catch (error) {
            console.log('error', error);
            reject(false);
        }
    });
};

const create = async (personaje) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await personajeRepository.create(personaje)
                .then((result) => resolve(result.insertId))
                .catch((error) => reject(error));
            // console.log(data);
            resolve(true);
        } catch (error) {
            console.log('error', error);
            reject(false);
        }
    });
};

module.exports = {
    getAll,
    getByUrl,
    getById,
    create,
};