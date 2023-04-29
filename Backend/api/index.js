//Creación e inicialización del servidor
require("dotenv").config();
const app = require("./app.js");
const { connection } = require("./db.js");
const { loadedNews } = require("./addDB");
const { transport } = require("./utils/email.utils.js");
const { PORT } = process.env;

connection
  .syncIndexes({ force: true })
  .then(async () => {
    // await loadedNews();
    await transport.verify();
    console.log("nodemailer conectado exitosamente.");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor ejecutado en puerto: ${PORT}`);
    });
  })
  .catch((error) => console.log("Algo salió mal: ", error));
