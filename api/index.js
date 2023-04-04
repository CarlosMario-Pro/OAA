const dotenv = require('dotenv');
dotenv.config();
const app = require("./app.js");
const { connection } = require("./db.js");
// const Categories = require("./models/User");
// const Comments = require("./models/User");
// const Favorites = require("./models/User");
// const News = require("./models/User");
const User = require("./models/User");
const PORT = process.env.PORT;


connection.syncIndexes({ force: true })
    .then(async () => {
        // Categories,
        User
        // News
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor ejecutado en puerto: ${PORT}`);
        });
    }
);



/*
PRIMEROS PASOS PARA CREAR E INICIALIZAR EL BACKEND DEL PROYECTO
1- Crear la Base de Datos en 'MongoDB' (Clúster, usuario, contraseña, IP)
2- Cree el 'package.json' con npm init -y y agregué el script "start": "node index.js"
3- Instalé las dependencias npm i axios bcrypt cors dotenv express mongoose nodemailer nodemon jsonwebtoken
4- Cree el servidos en el index.js
5- Configuré el servidor con express en el app.js
6- Creo la conexión a la DB en el db.js
7- Creo el .env con las variables de entorno
8- Creo el .gitignore
9- Defino las carpetás básicas del proyecto
10- En la carpeta de routes, creo un archivo llamado index.js con su código base
11- Ejecuto npm start para inicializar el servidor
12- Crear las rutas

!IMPORTANTE
Como este es solo un ejemplo para hacer un registro y login de usuarios, no cree nada en el archivo 'addDB.js'
La solución que encontré, fue que en este archivo requeri el schema de User:
const User = require("./models/User");
Y en el primer .then, lo pasé, así fue como logré guardar el schema para que se viera en Mongo Atlas
    .then(async () => {
        User
    })

*/