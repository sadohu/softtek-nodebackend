const { connection } = require('../config/Connection');

const findByIdPersonaje = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM personaje_pelicula WHERE idPersonaje = ?', id, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const findByIdPersonajeAndIdPelicula = (idPersonaje, idPelicula) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM personaje_pelicula WHERE idPersonaje = ? AND idPelicula = ?', [idPersonaje, idPelicula], (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const create = (personajePelicula) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO personaje_pelicula SET ?', personajePelicula, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = { findByIdPersonaje, findByIdPersonajeAndIdPelicula, create };

