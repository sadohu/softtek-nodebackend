const { HttpStatusCode } = require('axios');
const PersonajeService = require('../service/personajeService');

const get = async (request, response) => {
    const responseBody = {};
    try {
        const data = await PersonajeService.getAll();
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

const post = async (request, response) => {
    const responseBody = {};
    try {
        let body = '';
        request.on('data', (chunk) => {
            body += chunk;
        });

        request.on('end', async () => {
            const obj = JSON.parse(body);
            PersonajeService.create(obj)
                .then((result) => {
                    console.log('Resultado:', result);
                    responseBody.status = HttpStatusCode.Ok;
                    responseBody.message = 'Success';
                    responseBody.data = result;
                    response.writeHead(responseBody.status, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify(responseBody));
                })
                .catch((error) => {
                    console.log('Error:', error.message);
                    responseBody.status = HttpStatusCode.BadRequest;
                    responseBody.error = error.message;
                    response.writeHead(responseBody.status, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify(responseBody));
                }).finally(() => response.end());
        });
    } catch (error) {
        responseBody.status = HttpStatusCode.InternalServerError;
        responseBody.error = 'Internal Server Error';
        response.writeHead(responseBody.status, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(responseBody));
    }
};

module.exports = { get, post };