const { Router } = require("express");
const route = Router();
const newsRouter = require("../routes/News/NewsRoutes");
const newsletterRouter = require("./Newsletter/newsletterRoutes");
const adminRouter = require("./Admin/adminRoutes");
const ourWorkRouter = require("./OurWork/ourWork");
const galleryRouter = require("./Gallery/gallery");
const donationsRouter = require("./Donations/donations");
const radioProgramRouter = require("./RadioProgram/radioProgram");

/*--------------Rutas--------------*/
route.use("/admin", adminRouter); // Endpoint para los admin
route.use("/donations", donationsRouter); // Endpoint para donaciones
route.use("/gallery", galleryRouter); // Endpoint para Galería
route.use("/news", newsRouter); // Endpoint para las News
route.use("/newsletter", newsletterRouter); // Endpoint para las Newsletter
route.use("/work", ourWorkRouter); // Endpoint para OurWork
route.use("/radio-program", radioProgramRouter); // Endpoint para programa de radio

module.exports = route;
