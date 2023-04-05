const { Router } = require("express");
const route = Router();


const getNews = require("../routes/News/GetNews");          //La ruta para traer todas las noticias
const postNews = require("../routes/News/PostNews");        //La ruta para PostNews
const deleteNews = require("../routes/News/DeleteNews");    //La ruta para PostNews
const putNews = require("../routes/News/PutNews");          //La ruta para PostNews

const getUsers = require("../routes/User/GetUser");
const postUsers = require("../routes/User/PostUser");



/*--------------Rutas--------------*/
route.use("/", getNews);
route.use("/", postNews);
route.use("/", getUsers);
route.use("/", postUsers);



module.exports = route;