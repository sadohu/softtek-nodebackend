const { connection } = require('../config/Connection');

const findByIdPersonaje = (idPersonaje) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM personaje_navesespaciales WHERE idPersonaje = ?', idPersonaje, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const findByIdPersonajeAndIdNaveEspacial = (idPersonaje, idNaveEspacial) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM personaje_navesespaciales WHERE idPersonaje = ? AND idNaveEspacial = ?', [idPersonaje, idNaveEspacial], (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const create = (personajenaveespacial) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO personaje_navesespaciales SET ?', personajenaveespacial, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = { findByIdPersonaje, findByIdPersonajeAndIdNaveEspacial, create };
