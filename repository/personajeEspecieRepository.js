const { connection } = require('../config/Connection');

const findByIdPersonaje = (idPersonaje) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM personaje_especie WHERE idPersonaje = ?', idPersonaje, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const findByIdPersonajeAndIdEspecie = (idPersonaje, idEspecie) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM personaje_especie WHERE idPersonaje = ? AND idEspecie = ?', [idPersonaje, idEspecie], (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const create = (personajeEspecie) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO personaje_especie SET ?', personajeEspecie, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = {
    findByIdPersonaje,
    findByIdPersonajeAndIdEspecie,
    create
};