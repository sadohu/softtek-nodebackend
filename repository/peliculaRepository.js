const { connection } = require('../config/Connection');

const findById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM pelicula WHERE idPelicula = ?', id, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const findByUrl = (url) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM pelicula WHERE url = ?', url, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const create = (pelicula) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO pelicula SET ?', pelicula, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = { findById, findByUrl, create };