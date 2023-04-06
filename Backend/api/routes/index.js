const { Router } = require("express");
const route = Router();


const newsRouter = require("../routes/News/NewsRoutes");                        //Ruta para las News
const newsletterRouter = require("../routes/Newsletter/newsletterRoutes");      //Ruta para las Newsletter


const getUsers = require("../routes/User/GetUser");
const postUsers = require("../routes/User/PostUser");


const getAdmin = require("./Admin/GetAdmin"); //La ruta para traer todos los administradores
const deleteAdmin = require("./Admin/DeleteAdmin"); //La ruta para eliminar a un administrador
const putAdmin = require("./Admin/PutAdmin"); //La ruta para editar los datos de un administrador
const postAdmin = require("./Admin/PostAdmin"); //La ruta para crear un nuevo administrador
const passwordAdmin = require("./Admin/PasswordAdmin"); //La ruta para reestablecer una contraseña
const logAdmin = require("./Admin/LogAdmin"); //La verificar los datos de inicio de sesión


/*--------------Rutas--------------*/
route.use("/news", newsRouter);                                                 //Endpoint para las News
route.use("/newsletter", newsletterRouter);                                     //Endpoint para las Newsletter



//administrador
route.use("/getAdmin", getAdmin);
route.use("/postAdmin", postAdmin);
route.use("/putAdmin", putAdmin);
route.use("/deleteAdmin", deleteAdmin);
route.use("/logAdmin", logAdmin);
route.use("/passwordAdmin", passwordAdmin);


module.exports = route;