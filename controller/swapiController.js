const { HttpStatusCode } = require('axios');
const { SWAPI_PEOPLE, MICROSOFT_TRANSLATOR_FROM_EN_TO_ES } = require('../helper/apiServices');

/**
 * @swagger
 * /swapi:
 *   get:
 *     summary: Obtener personajes de Star Wars.
 *     description: Obtiene la lista de personajes de Star Wars.
 *     responses:
 *       200:
 *         description: Éxito.
 *         content:
 *           application/json:
 *             example: { "status": 200, "message": "OK", "data": [] }
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example: { "status": 500, "message": "Internal Server Error", "error": "Error details" }
 */
const get = async (request, response) => {
    const responseBody = {};
    try {
        const result = await fetch(SWAPI_PEOPLE);
        const data = await result.json();
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
    }
};

/**
 * @swagger
 * /swapi/es:
 *   get:
 *     summary: Obtener personajes de Star Wars en español.
 *     description: Obtiene la lista de personajes de Star Wars con las 'keys' en español.
 *     responses:
 *       200:
 *         description: Éxito.
 *         content:
 *           application/json:
 *             example: { "status": 200, "message": "OK", "data": [] }
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             example: { "status": 500, "message": "Internal Server Error", "error": "Error details" }
 */
const getSpanish = async (request, response) => {
    const responseBody = {};
    try {
        const people = await fetchPeopleData();
        const englishKeys = Object.keys(people[0]);
        const cleanKeysArray = cleanKeys(englishKeys);
        const spanishKeys = await translateKeys(cleanKeysArray);
        const normalizedSpanishKeys = normalizeKeys(spanishKeys);
        const camelCaseSpanishKeys = toCamelCase(normalizedSpanishKeys);
        const listPeoleWithSpanishKey = translatePeopleData(people, camelCaseSpanishKeys);

        responseBody.status = HttpStatusCode.Ok;
        responseBody.message = 'Success';
        responseBody.data = listPeoleWithSpanishKey;
        response.writeHead(responseBody.status, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(responseBody));
    } catch (error) {
        console.log('Error:', error);
        responseBody.status = HttpStatusCode.InternalServerError;
        responseBody.error = 'Internal Server Error';
        response.writeHead(responseBody.status, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(responseBody));
    }
};

/**
 * Obtiene la lista de personajes de Star Wars desde el servicio de SWAPI
 * @returns {Promise<Array>} Lista de personajes
 */
const fetchPeopleData = async () => {
    const result = await fetch(SWAPI_PEOPLE);
    const data = await result.json();
    const people = data.results;
    if (people === undefined || people === null) {
        throw new Error('No se encontraron personajes');
    }
    return people;
};

/**
 * Limpia el Array de Strings de guiones bajos
 * @param {Array} englishKeys Array de Strings
 * @returns {Array} Array de Strings sin guiones bajos
 */
const cleanKeys = (englishKeys) => {
    return englishKeys.map((key) => {
        return key.replace('_', ' ');
    });
};

/**
 * Traduce el texto de inglés a español
 * @param {*} cleanKeys Texto a traducir
 * @returns {Promise<String>} Texto traducido
 * @throws {Error} Error en la petición
 */
const translateKeys = async (cleanKeys) => {
    const translatorResponse = await fetch(MICROSOFT_TRANSLATOR_FROM_EN_TO_ES, {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.MICROSOFT_TRANSLATOR_API_KEY,
            'Ocp-Apim-Subscription-Region': process.env.MICROSOFT_TRANSLATOR_API_REGION,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ text: JSON.stringify(cleanKeys) }]),
    });

    if (!translatorResponse.ok) {
        const errorText = await translatorResponse.text();
        throw Error(`Error ${translatorResponse.status}: ${errorText}`);
    }

    const translatorData = await translatorResponse.json();
    return JSON.parse(translatorData[0].translations[0].text);
};

/**
 * Normaliza los Strings de un Array, eliminando tildes y caracteres especiales
 * @param {*} spanishKeys Array de Strings a normalizar
 * @returns {Array} Array de Strings normalizados
 */
const normalizeKeys = (spanishKeys) => {
    let normalizedSpanishKeys = [];
    for (const element of spanishKeys) {
        const edit = element.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        normalizedSpanishKeys.push(edit);
    }
    return normalizedSpanishKeys;
};

/**
 * Convierte los Strings de un Array a camelCase si tienen espacios
 * @param {*} normalizedSpanishKeys Array de Strings a convertir
 * @returns {Array} Array de Strings en camelCase
 */
const toCamelCase = (normalizedSpanishKeys) => {
    let camelCaseSpanishKeys = [];
    for (const element of normalizedSpanishKeys) {
        if (element.includes(' ')) {
            const camelCased = element.replace(/\s+(\w)/g, (_, letter) => letter.toUpperCase());
            camelCaseSpanishKeys.push(camelCased.charAt(0).toLowerCase() + camelCased.slice(1));
        } else {
            camelCaseSpanishKeys.push(element.toLowerCase());
        }
    }
    return camelCaseSpanishKeys;
};

/**
 * Traduce 'keys' de un objeto de inglés a español
 * @param {*} people Lista de personajes
 * @param {*} camelCaseSpanishKeys Array de Strings con 'keys' en español
 * @returns {Array} Lista de personajes con 'keys' en español
 */
const translatePeopleData = (people, camelCaseSpanishKeys) => {
    let listPeoleWithSpanishKey = [];
    for (const element of people) {
        const translatedData = {};
        const englishKeys = Object.keys(element);

        for (let i = 0; i < englishKeys.length; i++) {
            const key = englishKeys[i];
            const translatedKey = camelCaseSpanishKeys[i];
            translatedData[translatedKey] = element[key];
        }
        listPeoleWithSpanishKey.push(translatedData);
    }
    return listPeoleWithSpanishKey;
};


module.exports = {
    get,
    getSpanish,
};