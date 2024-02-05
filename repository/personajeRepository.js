const { connection } = require('../config/Connection');

const findAll = async () => {
    try {
        const [rows] = await connection.promise().query('SELECT * FROM personaje');
        return rows;
    } catch (error) {
        throw new Error(error);
    }
};

const findById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM personaje WHERE idPersonaje = ?', id, (error, result) => {
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
        connection.query('SELECT * FROM personaje WHERE url = ?', url, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const create = (personaje) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO personaje SET ?', personaje, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = { findAll, findById, findByUrl, create };