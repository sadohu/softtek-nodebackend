# Reto Técnico - Backend NodeJS
### Requerimientos:
- Crear un API en Node.js ✅
- Uso de framework Serverless para un despliegue en AWS ❌
- Adaptar y transformar los modelos de la API SWAPI a español, es decir tienenque mapear todos los nombres de los atributos del inglés al español ✅
- Integrar la API de prueba StarWars API ✅
- Crear un modelo de su elección mediante el uso de un endpoint POST ✅
- Crear un endpoint GET que muestre la data almacenada ✅

### Puntos mínimos-obligatorios
- Mínimo 2 endpoints, GET para recuperar la información y POST para crear un elemento ✅
- Integración con una base de datos (DynamoDB o MySQL) ✅
- Integración con SWAPI ✅
- Traducción de atributos de inglés a español ✅
- Uso de Serverless Framework ❌
- Uso de Node.js ✅
- Respeto de las buenas prácticas de desarrollo ✅

### Puntos Bonus
- Pruebas unitarias ✅
- Documentación de uso ✅
- Documentación en Open API/Swagger ✅
- Trabajar en capas y por dominio ✅
- Mayor complejidad de Integración
- Uso de TypeScript ❌
- Desplegar sin errores en AWS con el comando deploy del framework serverless ❌
- Uso de un framework ❌

## Manual de uso
### Requerimientos de sistema
- NodeJS: https://nodejs.org/en/download
- Visual Studio Code: https://code.visualstudio.com/
- Git: https://git-scm.com/downloads (Opcional)
- MySql: https://dev.mysql.com/downloads/installer/
- Proyecto: https://github.com/sadohu/softtek-nodebackend
- Dependencias usadas: (Descriptivo)
   - dotenv v16.4.1 https://www.npmjs.com/package/dotenv
   - axios v1.6.7 https://www.npmjs.com/package/axios
   - mysql2 v3.9.1 https://www.npmjs.com/package/mysql2
   - iconv-lite v0.6.2 https://www.npmjs.com/package/iconv-lite
   - swagger-jsdoc v6.2.8 https://www.npmjs.com/package/swagger-jsdoc
   - swagger-ui-express v5.0.0 https://www.npmjs.com/package/swagger-ui-express
   - nodemon v3.0.3 https://www.npmjs.com/package/nodemon
   - jest v29.7.0 https://www.npmjs.com/package/jest
   - swapi https://swapi.py4e.com/documentation

### Instalación de la aplicación
1. Abrir la terminar y ubicarse en el proyecto
2. Ejecutar `npm install` en la terminal
3. En la carpeta `database` encontraremos el script `swapidb.sql` el cual ejecutaremos en MySql

### Configuración del proyecto
1. En la ruta base del proyecto abriremos `.env`
2. MYSQL_HOST = URL DE MYSQL Ej: `127.0.0.1`
3. MYSQL_PORT = PUERTO DE MYSQL Ej: `3306`
4. MYSQL_USER = USER DE MYSQL Ej: `root`
5. MYSQL_PASS = CONTRASEÑA DEL USUARIO `123456`
6. MYSQL_DB = NOMBRE DE LA BASE DE DATOS `swapidb` (Por defecto en en el Script)
7. ⚠ MICROSOFT_TRANSLATOR_API_KEY agregaremos el `Api Key` proporcionada por el desarrollador ⚠
   - Debido a un advertencia en github, el apikey no puede ser expuesta

### Uso de la aplicación
1. Ejecutar `node server.js` en la terminal
2. Abrir en el navegador http://localhost:3000/api-docs/

### Puntos de consideración
- Debido a que el traductor es impreciso con los datos que genera es recomendable que se use el `Request Body` del método `POST`
- Los modelos que se usaron para crear la base de datos se encuentran en el archivo `data.json` en la carpeta `database`

### Ejecutar Test
Las pruebas unitarias se centraron a la insercción de data en la base de datos además de los listados de los mismos
1. Unit Test
   - Ejecutar `npm test` en la terminal, generará que se ejecuten todas las pruebas
   - Ejecutar `npm test *nombre_archivo*.test.js` en la terminal, geneará que se ejecuten solo las pruebas de ese archivo
2. Endpoints tests (Postman)
   - En la carpeta `database` se encontrará el archivo `Softtek.postman_collection.json` el cual se puede importar y obtener la collección usada










