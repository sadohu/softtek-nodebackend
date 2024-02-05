const http = require('http');
const app = require('./app');
const swagger = require('./swagger.config');

const server = http.createServer(app);

const PORT = process.env.SERVER_PORT || 3000;

// Monta la documentación Swagger en la ruta /api-docs
app.use('/api-docs', swagger.serve, swagger.setup);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
