//Creación e inicialización del servidor
const app = require("./app.js");
let dotenv = require('dotenv');
dotenv.config();
const { connection } = require("./db.js");
const { loadedCategories, loadedNews } = require("./addDB");
const PORT = process.env.PORT


connection.syncIndexes({ force: true })
    .then(async () => {
        await loadedCategories();
        await loadedNews();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor ejecutado en puerto: ${PORT}`);
        });
    }
);