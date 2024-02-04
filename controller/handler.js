const MainController = require('./mainController');
const PersonajeController = require('./personajeController');

const handleRequest = (request, response) => {
    if (request.url === '/' || request.url === '') {
        MainController.index(request, response);
    } else if (request.url === '/personaje' && request.method === 'GET') {
        PersonajeController.get(request, response);
    } else if (request.url === '/personaje' && request.method === 'POST') {
        PersonajeController.post(request, response);
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
};

module.exports = handleRequest;
