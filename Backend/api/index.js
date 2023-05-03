//Creación e inicialización del servidor
require("dotenv").config();
const app = require("./app.js");
const { connection } = require("./db.js");
const { loadedNews, loadedGalleries, loadedWorks } = require("./addDB");
const { PORT } = process.env;

connection
  .syncIndexes({ force: true })
  .then(async () => {
    await loadedNews();
    await loadedGalleries();
    await loadedWorks();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor ejecutado en puerto: ${PORT}`);
    });
  })
  .catch((error) => console.log("Algo salió mal: ", error));
