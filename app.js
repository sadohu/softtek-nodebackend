const handleRequest = require('./controller/handler');

const serverApp = (req, res) => {
    // Aquí puedes realizar cualquier lógica de middleware si es necesario

    handleRequest(req, res);
};

module.exports = serverApp;
