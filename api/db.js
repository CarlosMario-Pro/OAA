const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dotenv = require("dotenv");
dotenv.config();


mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Base de Datos conectada exitosamente");
    })
    .catch((err) => console.log(err));


module.exports = { connection: mongoose };