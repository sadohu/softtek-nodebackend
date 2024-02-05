// Propósito: Contiene las constantes de las URL de la API de Star Wars
const SWAPI_ENDPOINT = 'https://swapi.py4e.com/api/';
const SWAPI_PEOPLE = SWAPI_ENDPOINT + 'people/';

// Contiene las constantes de las URL de la API de Microsoft Translator
const MICROSOFT_TRANSLATOR_URL = 'https://api.cognitive.microsofttranslator.com/translate';
const MICROSOFT_TRANSLATOR_FROM_EN_TO_ES = MICROSOFT_TRANSLATOR_URL + '?api-version=3.0&from=en&to=es';

module.exports = {
    SWAPI_ENDPOINT,
    SWAPI_PEOPLE,
    MICROSOFT_TRANSLATOR_URL,
    MICROSOFT_TRANSLATOR_FROM_EN_TO_ES,
};
