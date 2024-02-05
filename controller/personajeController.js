const { HttpStatusCode } = require('axios');
const PersonajeService = require('../service/personajeService');

/**
 * @swagger
 * /personaje:
 *   get:
 *     summary: Obtener personajes desde la base de datos.
 *     description: Obtiene la lista de personajes.
 *     responses:
 *       200:
 *         description: Éxito.
 *         content:
 *           application/json:
 *             example: { "status": 200, "message": "OK", "data": [
 *                          "idPersonaje": number,
 *                            "nombre": "string",
 *                            "altura": "string",
 *                            "masa": "string",
 *                            "colorDeCabello": "string",
 *                            "colorDeLaPiel": "string",
 *                            "colorDeOjos": "string",
 *                            "anoDeNacimiento": "string",
 *                            "genero": "string",
 *                            "mundoNatal": "string",
 *                            "creado": "string",
 *                            "editado": "string",
 *                            "url": "string",
 *                            "peliculas": [{ "idPelicula": number, "url": "string" }],
 *                            "especies": [{ "idEspecie": number, "url": "string" }],
 *                            "vehiculos": [{ "idVehiculo": number, "url": "string" } ],
 *                            "navesEspaciales": [{ "idNavesEspaciales": number, "url": "string" }]
 *                          ]}
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example: { "status": 500, "message": "Internal Server Error", "error": "Error details" }
 */
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

/**
 * @swagger
 * /personaje:
 *   post:
 *     summary: Crear personaje.
 *     description: Crea un nuevo personaje.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               altura:
 *                 type: string
 *               masa:
 *                 type: string
 *               colorDeCabello:
 *                 type: string
 *               colorDeLaPiel:
 *                 type: string
 *               colorDeOjos:
 *                 type: string
 *               anoDeNacimiento:
 *                 type: string
 *               genero:
 *                 type: string
 *               mundoNatal:
 *                 type: string
 *               creado:
 *                 type: string
 *               editado:
 *                 type: string
 *               url:
 *                 type: string
 *               peliculas:
 *                 type: array
 *                 items:
 *                   type: string
 *               especies:
 *                 type: array
 *                 items:
 *                   type: string
 *               vehiculos:
 *                 type: array
 *                 items:
 *                   type: string
 *               navesEspaciales:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Creado.
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: Success
 *               data:
 *                 idPersonaje: number
 *                 nombre: string
 *                 altura: string
 *                 masa: string
 *                 colorDeCabello: string
 *                 colorDeLaPiel: string
 *                 colorDeOjos: string
 *                 anoDeNacimiento: string
 *                 genero: string
 *                 mundoNatal: string
 *                 creado: string
 *                 editado: string
 *                 url: string
 *                 peliculas:
 *                   - idPelicula: number
 *                     url: string
 *                 especies:
 *                   - idEspecie: number
 *                     url: string
 *                 vehiculos:
 *                   - idVehiculo: number
 *                     url: string
 *                 navesEspaciales:
 *                   - idNavesEspaciales: number
 *                     url: string
 *       400:
 *         description: Solicitud incorrecta.
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Bad Request
 *               error: Error details
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Internal Server Error
 *               error: Error details
 */
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
                    responseBody.status = HttpStatusCode.Created;
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