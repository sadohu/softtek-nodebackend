const { connection } = require('../config/Connection');

const findById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM vehiculo WHERE idVehiculo = ?', id, (error, result) => {
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
        connection.query('SELECT * FROM vehiculo WHERE url = ?', url, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const create = (vehiculo) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO vehiculo SET ?', vehiculo, (error, result) => {
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
            `SELECT v.* FROM vehiculo v
            inner join personaje_vehiculo mt on mt.idVehiculo = v.idVehiculo
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