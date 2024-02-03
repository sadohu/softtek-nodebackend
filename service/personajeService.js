const { connection } = require('../config/Connection');

const getAll = async () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM personaje', (error, result) => {
            if (error) {
                reject(error);
            }

            connection.end();
            resolve(result);
        });
    });
};

module.exports = { getAll };