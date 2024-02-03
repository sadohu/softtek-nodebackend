const personajeService = require('../../service/personajeService');

const personajeServiceTest = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await personajeService.getAll();
            data.forEach(element => {
                console.log(element);
            });
            resolve(true);
        } catch (error) {
            console.log('error', error);
            reject(false);
        }
    });
};

module.exports = personajeServiceTest;