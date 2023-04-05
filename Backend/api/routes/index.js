const { Router } = require("express");
const route = Router();

const getNews = require("../routes/News/GetNews"); //La ruta para traer todas las noticias
const postNews = require("../routes/News/PostNews"); //La ruta para crear las noticias
const deleteNews = require("../routes/News/DeleteNews"); //La ruta para eliminar las noticias
const putNews = require("../routes/News/PutNews"); //La ruta para modificar las noticias
const restoreNews = require("../routes/News/RestoreNews"); //La ruta para modificar las noticias

const getUsers = require("../routes/User/GetUser");
const postUsers = require("../routes/User/PostUser");

const getAdmin = require("./Admin/GetAdmin"); //La ruta para traer todos los administradores
const deleteAdmin = require("./Admin/DeleteAdmin"); //La ruta para eliminar a un administrador
const putAdmin = require("./Admin/PutAdmin"); //La ruta para editar los datos de un administrador
const postAdmin = require("./Admin/PostAdmin"); //La ruta para crear un nuevo administrador
const passwordAdmin = require("./Admin/PasswordAdmin"); //La ruta para reestablecer una contraseña
const logAdmin = require("./Admin/LogAdmin"); //La verificar los datos de inicio de sesión

/*--------------Rutas--------------*/
//noticias
route.use("/getNews", getNews);
route.use("/postNews", postNews);
route.use("/deleteNews", deleteNews);
route.use("/putNews", putNews);
route.use("/restoreNews", restoreNews);

//administrador
route.use("/getAdmin", getAdmin);
route.use("/postAdmin", postAdmin);
route.use("/putAdmin", putAdmin);
route.use("/deleteAdmin", deleteAdmin);
route.use("/logAdmin", logAdmin);
route.use("/passwordAdmin", passwordAdmin);

module.exports = route;
