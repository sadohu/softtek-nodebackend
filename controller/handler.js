const MainController = require('./mainController');
const PersonajeController = require('./personajeController');
const SwapiController = require('./swapiController');

const handleRequest = (request, response) => {
    if (request.url === '/' || request.url === '') {
        MainController.index(request, response);
    } else if (request.url === '/personaje' && request.method === 'GET') {
        PersonajeController.get(request, response);
    } else if (request.url === '/personaje' && request.method === 'POST') {
        PersonajeController.post(request, response);
    } else if (request.url === '/swapi' && request.method === 'GET') {
        SwapiController.get(request, response);
    } else if (request.url === '/swapi/es' && request.method === 'GET') {
        SwapiController.getSpanish(request, response);
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
};

module.exports = handleRequest;
