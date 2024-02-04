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

const create = (personaje) => {
    return new Promise((resolve, reject) => {

        connection.beginTransaction(async () => {
            try {
                // Validamos los atributos extras del personaje, si no existen, detenemos la ejecucion
                personajeServiceImpl.validExtrasAttributes(personaje, resolve, reject);

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
                    reject(new Error("El personaje ya existe"));
                    return;
                }

                try {
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
                    peliculaServiceImpl.peliculasBindToPersonaje(newPersonaje, listPeliculas);
                    vehiculoServiceImpl.vehiculosBindToPersonaje(newPersonaje, listVehiculos);
                    especieServiceImpl.especiesBindToPersonaje(newPersonaje, listEspecies).catch((error) => reject(new Error(error)));
                    navesEspacialesServiceImpl.navesEspacialesBindToPersonaje(newPersonaje, listNavesEspaciales);

                    // Agregamos los atributos extras al objeto personajeDto
                    newPersonaje.peliculas = listPeliculas;
                    newPersonaje.vehiculos = listVehiculos;
                    newPersonaje.especie = listEspecies;
                    newPersonaje.navesEspaciales = listNavesEspaciales;

                    // Realizamos el commit
                    connection.commit((error) => {
                        if (error) {
                            connection.rollback(() => {
                                reject(new Error(error));
                            });
                        } else {
                            resolve(newPersonaje);
                        }
                    });
                } catch (error) {
                    connection.rollback(() => {
                        reject(new Error(error));
                    });
                }

            } catch (error) {
                connection.rollback(() => {
                    reject(error);
                });
            }
        });

    });
};

module.exports = { getAll, create };
