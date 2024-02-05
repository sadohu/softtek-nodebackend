const { connection } = require('../config/Connection');

const findById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM especie WHERE idEspecie = ?', id, (error, result) => {
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
        connection.query('SELECT * FROM especie WHERE url = ?', url, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const create = (especie) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO especie SET ?', especie, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const findByIdPersonaje = async (idPersonaje) => {
    try {
        const [rows] = await connection.promise().query(
            `SELECT e.* FROM especie e
            inner join personaje_especie mt on mt.idEspecie = e.idEspecie
            where mt.idPersonaje = ? `,
            idPersonaje
        );
        return rows;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    findById,
    findByUrl,
    create,
    findByIdPersonaje,
};