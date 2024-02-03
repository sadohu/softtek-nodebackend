const { HttpStatusCode } = require('axios');
const PersonajeService = require('../service/personajeService');

const get = async (request, response) => {
    const responseBody = {};
    try {
        const data = await PersonajeService.getAll();
        // console.log("Data: ", data);
        responseBody.status = HttpStatusCode.Ok;
        responseBody.message = 'Success';
        responseBody.data = data;
        response.writeHead(responseBody.status, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(responseBody));
    } catch (error) {
        responseBody.status = HttpStatusCode.InternalServerError;
        responseBody.error = 'Internal Server Error';
        response.writeHead(responseBody.status, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(responseBody));
    } finally {
        response.end();
    }
};

module.exports = { get };