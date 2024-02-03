const handleRequest = require('./controller/handler');

const serverApp = (request, response) => {
    // Aquí puedes realizar cualquier lógica de middleware si es necesario

    handleRequest(request, response);
};

module.exports = serverApp;
