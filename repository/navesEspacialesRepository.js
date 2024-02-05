const { connection } = require('../config/Connection');

const findById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM navesespaciales WHERE idNavesEspaciales = ?', id, (error, result) => {
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
        connection.query('SELECT * FROM navesespaciales WHERE url = ?', url, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const create = (nave) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO navesespaciales SET ?', nave, (error, result) => {
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
            `SELECT n.* FROM navesespaciales n
            inner join personaje_navesespaciales mt on mt.idNavesEspaciales = n.idNavesEspaciales
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
