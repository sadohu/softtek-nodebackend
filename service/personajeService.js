const { connection } = require('../config/Connection');
const personajeServiceImpl = require('./personajeServicesImpl');
const peliculaServiceImpl = require('./peliculaServicesImpl');
const especieServiceImpl = require('./especieServicesImpl');
const vehiculoServiceImpl = require('./vehiculoServicesImpl');
const navesEspacialesServiceImpl = require('./navesEspacialesServicesImpl');

const getAll = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const list = await personajeServiceImpl.getAllPersonajes();
            resolve(list);
        } catch (error) {
            reject(error);
        }
    });
};

const create = async (personaje) => {
    try {
        await connection.promise().beginTransaction();

        // Validamos los atributos extras del personaje, si no existen, detenemos la ejecucion
        personajeServiceImpl.validExtrasAttributes(personaje);

        // Obtenemos los atributos extras del personaje
        const peliculas = personaje.peliculas;
        const especie = personaje.especie;
        const vehiculos = personaje.vehiculos;
        const navesEspaciales = personaje.navesEspaciales;

        // Eliminamos los atributos extras del personaje
        delete personaje.peliculas;
        delete personaje.especie;
        delete personaje.vehiculos;
        delete personaje.navesEspaciales;

        /**
         * Validamos si el personaje existe, si existe, detenemos la ejecucion
         * @param existPersonaje Obtenemos el personaje por su url
         * @returns {Error} El personaje ya existe
         */
        const existPersonaje = await personajeServiceImpl.personajeFindByUrl(personaje.url);
        if (existPersonaje.length > 0) {
            throw Error("El personaje ya existe");
        }

        /** Personaje
        * @param idNewPersonaje 1. Insertamos el personaje y obtenemos el id
        * @param newPersonaje 2. Obtenemos el personaje insertado
        */
        const idNewPersonaje = await personajeServiceImpl.personajeCreate(personaje);
        const newPersonaje = await personajeServiceImpl.personajeFindById(idNewPersonaje);

        /** Atributos extras (peliculas, especie, vehiculos, navesEspaciales)
         * @param idAtributoExtra 1. Obtenemos los ids de los atributos extras insertadas o existentes
         * @param listAtributosExtra 2. Obtenemos los atributos extras por su id
         */
        // Peliculas
        const idPeliculas = await peliculaServiceImpl.getIdPeliculas(peliculas);
        const listPeliculas = await peliculaServiceImpl.getListPeliculas(idPeliculas);
        // Especies
        const idEspecies = await especieServiceImpl.getIdEspecies(especie);
        const listEspecies = await especieServiceImpl.getListEspecies(idEspecies);
        // Vehiculos
        const idVehiculos = await vehiculoServiceImpl.getIdVehiculos(vehiculos);
        const listVehiculos = await vehiculoServiceImpl.getListVehiculos(idVehiculos);
        // Naves Espaciales
        const idNavesEspaciales = await navesEspacialesServiceImpl.getIdNavesEspaciales(navesEspaciales);
        const listNavesEspaciales = await navesEspacialesServiceImpl.getListNavesEspaciales(idNavesEspaciales);

        // Relacionamos los atributos extras al personaje
        await peliculaServiceImpl.peliculasBindToPersonaje(newPersonaje, listPeliculas);
        await vehiculoServiceImpl.vehiculosBindToPersonaje(newPersonaje, listVehiculos);
        await especieServiceImpl.especiesBindToPersonaje(newPersonaje, listEspecies);
        await navesEspacialesServiceImpl.navesEspacialesBindToPersonaje(newPersonaje, listNavesEspaciales);

        // Agregamos los atributos extras al objeto personajeDto
        newPersonaje.peliculas = listPeliculas;
        newPersonaje.vehiculos = listVehiculos;
        newPersonaje.especie = listEspecies;
        newPersonaje.navesEspaciales = listNavesEspaciales;

        // Realizamos el commit
        await connection.promise().commit();
        return newPersonaje;

    } catch (error) {
        await connection.promise().rollback();
        throw Error(error);
    }
};

module.exports = { getAll, create };
