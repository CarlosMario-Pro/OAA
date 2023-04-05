const { Router } = require("express");
const route = Router();


const getNews = require("../routes/News/GetNews");          //La ruta para traer todas las noticias
const postNews = require("../routes/News/PostNews");        //La ruta para crear las noticias
const deleteNews = require("../routes/News/DeleteNews");    //La ruta para eliminar las noticias
const putNews = require("../routes/News/PutNews");          //La ruta para modificar las noticias
const restoreNews = require("../routes/News/RestoreNews");          //La ruta para modificar las noticias

const getUsers = require("../routes/User/GetUser");
const postUsers = require("../routes/User/PostUser");



/*--------------Rutas--------------*/
route.use("/getNews", getNews);
route.use("/postNews", postNews);
route.use("/deleteNews", deleteNews);
route.use("/putNews", putNews);
route.use("/restoreNews", restoreNews);



module.exports = route;