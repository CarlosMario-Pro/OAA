const { Router } = require("express");
const news = require("../../controllers/newsControllers");
const newsRouter = Router();

//-----> http://localhost:3001/news
newsRouter.get("/", news.getNews); //GET para obtener todas las News
newsRouter.get("/:id", news.getOneNews); //GET:id para obtener una New por su id
newsRouter.post("/", news.postNews); //POST para crear una New
newsRouter.put("/:id", news.putNews); //PUT para modificar una New
newsRouter.put("/remove-news/:id", news.removeNews); //PUT para aplicar borrador lógico a una New
newsRouter.put("/reactive-news/:id", news.reactiveNews); //PUT para deshacer borrador lógico a una New
newsRouter.delete("/:id", news.deleteNews); //DELETE para eliminar una New

module.exports = newsRouter;
