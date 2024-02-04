const peliculaRepository = require('../repository/peliculaRepository');
const personajePeliculaRepository = require('../repository/personajePeliculaRepository');

/**
 * Busca un pelicula por su url
 * @param {*} url Url del pelicula
 * @returns Objeto del pelicula encontrado
 */
const getByUrl = async (url) => {
    return new Promise(async (resolve, reject) => {
        await peliculaRepository.findByUrl(url)
            .then((result) => resolve(result))
            .catch((error) => reject(new Error(error)));
    });
};

/**
 * Busca un pelicula por su id
 * @param {*} id Id del pelicula
 * @returns Objeto del pelicula encontrado
 */
const getById = async (id) => {
    return new Promise(async (resolve, reject) => {
        await peliculaRepository.findById(id)
            .then((result) => resolve(result[0]))
            .catch((error) => reject(new Error(error)));
    });
};

/**
 * Crea un pelicula
 * @param {*} pelicula Objeto del pelicula a crear
 * @returns Id del pelicula creado
 */
const create = async (pelicula) => {
    return new Promise(async (resolve, reject) => {
        await peliculaRepository.create(pelicula)
            .then((result) => resolve(result.insertId))
            .catch((error) => reject(new Error(error)));
    });
};

/**
 * Crea un registro en la tabla personaje_pelicula
 * @param {*} personajePelicula Objeto con el id del personaje y el id del pelicula
 * @returns Objeto con el resultado de la insercion
 */
const personajePeliculaCreate = async (personajePelicula) => {
    return new Promise(async (resolve, reject) => {
        await personajePeliculaRepository.create(personajePelicula)
            .then((result) => resolve(result))
            .catch((error) => reject(new Error(error)));
    });
};

/**
 * Asocia las peliculas a un personaje
 * @param {*} personaje Objeto del personaje
 * @param {*} peliculaList Array de peliculas
 */
const peliculasBindToPersonaje = async (personaje, peliculaList) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const element of peliculaList) {
                const personajePelicula = {
                    idPersonaje: personaje.idPersonaje,
                    idPelicula: element.idPelicula
                };
                const inserted = await personajePeliculaRepository.create(personajePelicula)
                    .then((result) => result)
                    .catch((error) => reject(new Error(error)));
            }
            resolve(true);
        } catch (error) {
            reject(false);
        }

    });
};

/**
 * Obtiene los id de los peliculas
 * @param {*} peliculas Url de los peliculas
 * comprueba por cada elemeto si ya existen en la base de datos
 * de ser no existir, lo crea y lo agrega al array de Ids
 * de existir, obtiene su id y lo agrega al array de Ids
 * @returns Array de id de los peliculas
 */
const getIdPeliculas = async (peliculas) => {
    let idPeliculas = [];
    for (const element of peliculas) {
        const existPelicula = await getByUrl(element);
        if (existPelicula.length === 0) {
            const obj = { url: element };
            const idInserted = await create(obj);
            idPeliculas.push(idInserted);
        } else {
            idPeliculas.push(existPelicula[0].idPelicula);
        }
    }
    return idPeliculas;
};

/**
 * Obtiene los peliculas insertados
 * @param {*} idPeliculas Array de id de los peliculas
 * obtiene los peliculas por su id y los agrega a un array
 * @returns Array de peliculas insertados
 */
const getListPeliculas = async (idPeliculas) => {
    let listPeliculas = [];
    for (const element of idPeliculas) {
        const existPelicula = await getById(element);
        listPeliculas.push(existPelicula);
    }
    return listPeliculas;
};

module.exports = {
    getByUrl,
    create,
    getById,
    personajePeliculaCreate,
    peliculasBindToPersonaje,
    getIdPeliculas,
    getListPeliculas,
};