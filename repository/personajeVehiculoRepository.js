const { connection } = require('../config/Connection');

const findByIdPersonaje = (idPersonaje) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM personaje_vehiculo WHERE idPersonaje = ?', idPersonaje, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const findByIdPersonajeAndIdVehiculo = (idPersonaje, idVehiculo) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM personaje_vehiculo WHERE idPersonaje = ? AND idVehiculo = ?', [idPersonaje, idVehiculo], (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const create = (personajevehiculo) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO personaje_vehiculo SET ?', personajevehiculo, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = { findByIdPersonaje, findByIdPersonajeAndIdVehiculo, create };