const { connection } = require('../config/Connection');
const personajeServiceImpl = require('./personajeServicesImpl');
const vehiculoServiceImpl = require('./vehiculoServicesImpl');

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
                // Validamos los atributos extras del personaje
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

                // Obtenemos al personaje por su url
                const existPersonaje = await personajeServiceImpl.personajeFindByUrl(personaje.url);

                // Si el personaje existe, detenemos la ejecucion
                if (existPersonaje.length > 0) {
                    reject(new Error("El personaje ya existe"));
                    return;
                }

                // Insertamos el personaje y obtenemos el id
                const idNewPersonaje = await personajeServiceImpl.personajeCreate(personaje);

                // Obtenemos el personaje insertado
                const newPersonaje = await personajeServiceImpl.personajeFindById(idNewPersonaje);

                // Obtenemos los ids de los vehiculos insertados o existentes
                const idVehiculos = await vehiculoServiceImpl.getIdVehiculos(vehiculos);

                // Obtenemos los vehiculos por su id
                const listVehiculos = await vehiculoServiceImpl.getListVehiculos(idVehiculos);

                // Insertamos los vehiculos al personaje
                vehiculoServiceImpl.vehiculosBindToPersonaje(newPersonaje, listVehiculos);

                // Agregamos los atributos extras al personaje
                newPersonaje.vehiculos = listVehiculos;

                // Realizamos el commit
                connection.commit((error) => {
                    if (error) {
                        connection.rollback(() => {
                            reject(error);
                        });
                    } else {
                        resolve(newPersonaje);
                    }
                });

            } catch (error) {
                connection.rollback(() => {
                    reject(error);
                });
            }
        });

    });
};

module.exports = { getAll, create };
