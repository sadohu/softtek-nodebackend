const { HttpStatusCode } = require('axios');
const { SWAPI_PEOPLE, MICROSOFT_TRANSLATOR_FROM_EN_TO_ES } = require('../helper/apiServices');

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

const getSpanish = async (request, response) => {
    const responseBody = {};
    try {
        const result = await fetch(SWAPI_PEOPLE);
        const data = await result.json();
        const people = data.results;
        if (people === undefined || people === null) {
            throw new Error('No se encontraron personajes');
        }

        const fristCharacter = people[0];
        const keys = Object.keys(fristCharacter);
        // const person = {
        //     "name": "Luke Skywalker",
        //     "height": "172",
        //     "mass": "77",
        //     "hair_color": "blond",
        //     "skin_color": "fair",
        //     "eye_color": "blue",
        //     "birth_year": "19BBY",
        //     "gender": "male",
        //     "homeworld": "https://swapi.py4e.com/api/planets/1/",
        //     "films": [
        //         "https://swapi.py4e.com/api/films/1/",
        //         "https://swapi.py4e.com/api/films/2/",
        //         "https://swapi.py4e.com/api/films/3/",
        //         "https://swapi.py4e.com/api/films/6/",
        //         "https://swapi.py4e.com/api/films/7/"
        //     ],
        //     "species": [
        //         "https://swapi.py4e.com/api/species/1/"
        //     ],
        //     "vehicles": [
        //         "https://swapi.py4e.com/api/vehicles/14/",
        //         "https://swapi.py4e.com/api/vehicles/30/"
        //     ],
        //     "starships": [
        //         "https://swapi.py4e.com/api/starships/12/",
        //         "https://swapi.py4e.com/api/starships/22/"
        //     ],
        //     "created": "2014-12-09T13:50:51.644000Z",
        //     "edited": "2014-12-20T21:17:56.891000Z",
        //     "url": "https://swapi.py4e.com/api/people/1/"
        // };

        // const keys = ['name', 'height',
        //     'mass', 'hair_color',
        //     'skin_color', 'eye_color',
        //     'birth_year', 'gender',
        //     'homeworld', 'films',
        //     'species', 'vehicles',
        //     'starships', 'created',
        //     'edited', 'url'];
        console.log('Keys:', keys);

        const cleanKeys = keys.map((key) => {
            return key.replace('_', ' ');
        });
        console.log('Clean Keys:', cleanKeys);


        const translatorResponse = await fetch(MICROSOFT_TRANSLATOR_FROM_EN_TO_ES, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.MICROSOFT_TRANLATOR_API_KEY,
                'Ocp-Apim-Subscription-Region': process.env.MICROSOFT_TRANSLATOR_API_REGION,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{ text: JSON.stringify(cleanKeys) }]),
        });

        if (!translatorResponse.ok) {
            const errorText = await translatorResponse.text();
            console.error(`Error ${translatorResponse.status}: ${errorText}`);
            // Aquí puedes manejar el error de manera adecuada.
        }

        const translatorData = await translatorResponse.json();
        console.log('Translator Data:', translatorData);

        const spanishText = await translatorData[0].translations[0].text;
        const spanishKeys = JSON.parse(spanishText);

        // const spanishKeys = ["nombre", "altura", "masa", "color de cabello", "color de piel", "color de ojos", "año de nacimiento", "género", "mundo natal", "películas", "especie", "vehículos", "naves espaciales", "creado", "editado", "url"];
        console.log('Spanish Keys:', spanishKeys);

        let normalizedSpanishKeys = [];
        for (const element of spanishKeys) {
            const edit = element.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            normalizedSpanishKeys.push(edit);
        }
        console.log('normalizedSpanishKeys:', normalizedSpanishKeys);

        let camelCaseSpanishKeys = [];
        for (const element of normalizedSpanishKeys) {
            if (element.includes(' ')) {
                const camelCased = element.replace(/\s+(\w)/g, (_, letter) => letter.toUpperCase());
                camelCaseSpanishKeys.push(camelCased.charAt(0).toLowerCase() + camelCased.slice(1));
            } else {
                camelCaseSpanishKeys.push(element.toLowerCase());
            }
        }
        console.log('camelCaseSpanishKeys:', camelCaseSpanishKeys);

        let listPersonSpanishKey = [];
        for (const element of people) {
            const translatedData = {};
            const x = Object.keys(element);

            for (let i = 0; i < x.length; i++) {
                const key = x[i];
                const translatedKey = camelCaseSpanishKeys[i];
                translatedData[translatedKey] = element[key];
            }
            // console.log('Translated Data:', translatedData);
            listPersonSpanishKey.push(translatedData);
        }


        responseBody.status = HttpStatusCode.Ok;
        responseBody.message = 'Success';
        // responseBody.data = data.results;
        responseBody.data = listPersonSpanishKey;
        response.writeHead(responseBody.status, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(responseBody));
        // response.end();
    }
    catch (error) {
        console.log('Error:', error);
        responseBody.status = HttpStatusCode.InternalServerError;
        responseBody.error = 'Internal Server Error';
        response.writeHead(responseBody.status, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(responseBody));
    }
};


module.exports = {
    get,
    getSpanish,
};