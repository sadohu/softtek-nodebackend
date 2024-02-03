const { connection } = require('../../config/Connection');

const connectionTest = () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL Server:', err);
                reject(err);
            } else {
                console.log('Connected to MySQL Server!');
                connection.end();
                console.log('Disconnected from MySQL Server!');
                resolve();
            }
        });
    });
};

module.exports = connectionTest;
