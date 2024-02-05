const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tu Aplicación API',
            version: '1.0.0',
            description: 'Descripción de tu API',
        },
    },
    apis: ['./controller/*.js'],
};

const specs = swaggerJSDoc(options);

module.exports = {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(specs),
};
