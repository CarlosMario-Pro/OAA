const { Router } = require("express");
const galleryRouter = Router();
const gallery = require("../../controllers/galleryControllers");

// URL: http://localhost:3001/gallery/

// ---- GET *
galleryRouter.get("/", gallery.getGalleries); //----->  Traer a todos los datos de la galería

galleryRouter.get("/:id", gallery.getOneGallery); //----->  Traer a un dato de la galería

//----POST *
galleryRouter.post("/", gallery.postGallery); // ----> Crear un nuevo dato en la galería

//----PUT *
galleryRouter.put("/:id", gallery.putGallery); //----->  Editar un archivo de la galería

galleryRouter.put("/remove/:id", gallery.removeGallery); //----> Eliminar un archivo con borrado lógico

galleryRouter.put("/reactive/:id", gallery.reactiveGallery); // --> Recuperar un archivo con borrado lógico

//----DELETE *
galleryRouter.delete("/:id", gallery.deleteGallery); // ---> Borrado real

module.exports = galleryRouter;
