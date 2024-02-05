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

const findByIdPersonaje = async (idPersonaje) => {
    try {
        const [rows] = await connection.promise().query(
            `SELECT e.* FROM pelicula e
            inner join personaje_pelicula mt on mt.idPelicula = e.idPelicula
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