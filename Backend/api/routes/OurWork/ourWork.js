const { Router }        = require("express");
const ourWorkController = require("../../controllers/ourWorkController");
const ourWorkRouter     = Router();

//------> http://localhost:3001/work

// ---- GET
ourWorkRouter.get("/", ourWorkController.getOurWork);

ourWorkRouter.get("/:id", ourWorkController.getOurWorkById);

// ---- POST
ourWorkRouter.post("/", ourWorkController.postOurWork);

// ---- PUT
ourWorkRouter.put("/:id", ourWorkController.putOurWork);

// ---- PUT RESTORE
ourWorkRouter.put("/restore/:id", ourWorkController.restoreOurWork);


// ---- DELETE
ourWorkRouter.delete("/:id", ourWorkController.deleteOurWork)

module.exports = ourWorkRouter;