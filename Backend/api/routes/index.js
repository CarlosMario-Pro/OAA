const { Router } = require("express");
const route = Router();
const newsRouter = require("../routes/News/NewsRoutes");
const newsletterRouter = require("./Newsletter/newsletterRoutes");
const adminRouter = require("./Admin/adminRoutes");
const ourWorkRouter = require("./OurWork/ourWork");
const galleryRouter = require("./Gallery/gallery");

/*--------------Rutas--------------*/
route.use("/news", newsRouter); // Endpoint para las News
route.use("/newsletter", newsletterRouter); // Endpoint para las Newsletter
route.use("/admin", adminRouter); // Endpoint para los admin
route.use("/work", ourWorkRouter); // Endpoint para OurWork
route.use("/gallery", galleryRouter); // Endpoint para Galería

module.exports = route;
