const peliculaRepository = require('../../repository/peliculaRepository');
const personajePeliculaRepository = require('../../repository/personajePeliculaRepository');

const getByUrl = async (url) => {
    return new Promise(async (resolve, reject) => {
        await peliculaRepository.findByUrl(url)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};

const getById = async (id) => {
    return new Promise(async (resolve, reject) => {
        await peliculaRepository.findById(id)
            .then((result) => resolve(result[0]))
            .catch((error) => reject(error));
    });
};

const create = async (pelicula) => {
    return new Promise(async (resolve, reject) => {
        await peliculaRepository.create(pelicula)
            .then((result) => resolve(result.insertId))
            .catch((error) => reject(error));
    });
};

const personajePeliculaCreate = async (personajePelicula) => {
    return new Promise(async (resolve, reject) => {
        await personajePeliculaRepository.create(personajePelicula)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};

const peliculasBindToPersonaje = async (personaje, peliculaList) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const element of peliculaList) {
                const personajePelicula = { idPersonaje: personaje.idPersonaje, idPelicula: element.idPelicula };
                const inserted = await personajePeliculaRepository.create(personajePelicula)
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
    personajePeliculaCreate,
    peliculasBindToPersonaje,
};