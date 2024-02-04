const { connection } = require('../config/Connection');
const personajeRepository = require('../repository/personajeRepository');
const vehiculoRepository = require('../repository/vehiculoRepository');
const personajeVehiculoRepository = require('../repository/personajeVehiculoRepository');

const getAll = async () => {
    return new Promise(async (resolve, reject) => {
        await personajeRepository.findAll()
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });
};

const create = (personaje) => {
    return new Promise((resolve, reject) => {

        connection.beginTransaction(async () => {
            try {
                // Obtenemos las peliculas
                const vehiculos = personaje.vehiculos;

                // Verificamos que el parametro de vehiculos no sea undefined, si lo es, rechazamos la promesa
                if (vehiculos === undefined) {
                    reject(new Error("Parametro de vehiculo es requerido"));
                    return;
                }

                // Eliminamos el parametro de vehiculos del objeto personaje
                delete personaje.vehiculos;

                /**
                 * Buscamos el personaje por su url, si existe, rechazamos la promesa
                 * Si no existe, lo insertamos y obtenemos el id
                 * @param {Object} personaje
                 * @function personajeRepository.findByUrl Busca un personaje por su url
                 * @param existPersonaje Array de personajes que coinciden con la url
                 */
                const existPersonaje = await personajeRepository.findByUrl(personaje.url)
                    .then((result) => result)
                    .catch((error) => reject(error));
                // console.log("existPersonaje", existPersonaje);

                // Si el personaje existe, rechazamos la promesa
                if (existPersonaje.length > 0) {
                    reject(new Error("El personaje ya existe"));
                    return;
                }

                /**
                 * Insertamos el personaje y obtenemos el id
                 * @param {Object} personaje
                 * @function personajeRepository.create Crea un personaje
                 * @param idNewPersonaje Id del personaje insertado
                 * @param newPersonaje Objeto del personaje insertado
                 */
                const idNewPersonaje = await personajeRepository.create(personaje)
                    .then((result) => result.insertId)
                    .catch((error) => reject(error));
                // console.log("idNewPersonaje", idNewPersonaje);

                /**
                 * Obtenemos el personaje insertado
                 * @param {Number} idNewPersonaje
                 * @function personajeRepository.findById Busca un personaje por su id
                 * @param newPersonaje Objeto del personaje insertado
                 */
                // Obtenemos el personaje insertado
                const newPersonaje = await personajeRepository.findById(idNewPersonaje)
                    .then((result) => result[0])
                    .catch((error) => reject(error));
                // console.log("newPersonaje", newPersonaje);


                let idVehiculos = [];
                /**
                 * Recorremos el array de vehiculos, si el vehiculo no existe en la base de datos, lo insertamos y guardamos el id
                 * Si el vehiculo existe, guardamos el id
                 * @param {Array} vehiculos
                 * @function vehiculoRepository.findByUrl Busca un vehiculo por su url
                 * @function vehiculoRepository.create Crea un vehiculo
                 * @param idVehiculos Array de ids de vehiculos
                 */
                for (const element of vehiculos) {
                    const existVehiculo = await vehiculoRepository.findByUrl(element)
                        .then((result) => result)
                        .catch((error) => reject(error));
                    // console.log("existVehiculo", existVehiculo);

                    if (existVehiculo.length === 0) {
                        const obj = { url: element };
                        const inserted = await vehiculoRepository.create(obj)
                            .then((result) => result.insertId)
                            .catch((error) => reject(error));
                        // console.log("inserted", inserted);
                        idVehiculos.push(inserted);
                    } else {
                        // console.log("existVehiculo[0].idVehiculo", existVehiculo[0].idVehiculo);
                        idVehiculos.push(existVehiculo[0].idVehiculo);
                    }
                }


                let listVehiculos = [];
                for (const element of idVehiculos) {
                    const vehiculo = await vehiculoRepository.findById(element)
                        .then((result) => result)
                        .catch((error) => reject(error));

                    listVehiculos = listVehiculos.concat(vehiculo);
                }

                // console.log("listVehiculos", listVehiculos);

                for (const element of listVehiculos) {
                    // console.log("element", element);
                    const personajeVehiculo = { idPersonaje: newPersonaje.idPersonaje, idVehiculo: element.idVehiculo };
                    const inserted = await personajeVehiculoRepository.create(personajeVehiculo)
                        .then((result) => result)
                        .catch((error) => reject(error));
                    // console.log("inserted", inserted);
                }

                newPersonaje.vehiculos = listVehiculos;
                // console.log("newPersonaje", newPersonaje);
                /**
                 * commit
                 */
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
