const serverApp = require('./controller/handler');
const express = require('express');
const swagger = require('./swagger.config');

const app = express();

// Monta la documentación Swagger en la ruta /api-docs
app.use('/api-docs', swagger.serve, swagger.setup);

// Lógica de manejo de rutas
app.use(serverApp);

module.exports = app;
