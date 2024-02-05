/**
 * @swagger
 * /:
 *   get:
 *     summary: index
 *     description: Devuelve un mensaje de bienvenida.
 *     responses:
 *       200:
 *         description: Operación exitosa.
 */

const index = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bienvenidos a Star Wars API!');
};

module.exports = { index };