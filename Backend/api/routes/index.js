const { Router }       = require("express");
const   route          = Router();
const newsRouter       = require("../routes/News/NewsRoutes");                  //Ruta para las News
const newsletterRouter = require("./Newsletter/newsletterRoutes");              //Ruta para las Newsletter
const adminRouter      = require("./Admin/adminRoutes")
const ourWorkRouter    = require("./OurWork/ourWork")


/*--------------Rutas--------------*/
route.use("/news", newsRouter);                   // Endpoint para las News
route.use("/newsletter", newsletterRouter);       // Endpoint para las Newsletter
route.use("/admin", adminRouter)                  // Endpoint para los admin
route.use("/work", ourWorkRouter )                // Endpoint para OurWork


module.exports = route;