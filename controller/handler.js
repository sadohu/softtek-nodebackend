const MainController = require('./mainController');

const handleRequest = (request, response) => {
    if (request.url === '/' || request.url === '') {
        MainController.index(request, response);
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
};

module.exports = handleRequest;
