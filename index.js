const express = require("express");
const cors = require('cors');

const { dbConnection } = require("./database/config");
require("dotenv").config();
//Crear servidor express

const app = express();

app.use(cors());

dbConnection();
//Middleware para recibir la información de peticiones en formato JSON
app.use(express.json())



app.use("/api/new", require("./routes/Insertar_partido"));

app.use("/api/equipo", require("./routes/Obtener_partidos"));

//Rutas para CRUD: Eventos

//Directorio público - el use en express es concodio como un middleware, es una función que
app.use(express.static("public"));


//Lectura y parseo del body - (Recibir la información que se hace con una petición, es decir recibir info como nombre, correo, y password
//en una petición post)



// Escuchar peticiones
app.listen(process.env.PORT || 5000, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});