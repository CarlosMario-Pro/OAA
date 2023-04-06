const { Router } = require("express");
const adminRouter = Router();
const admin = require("../../controllers/adminControllers");



// ---- GET **
adminRouter.get("/", admin.getAdmin);  //----->  Trae a todos los administradores  | http://localhost:3001/admin/:id


adminRouter.get("/:id", admin.getAdminsById);  //----->  Trae a un administrador por id  | http://localhost:3001/admin/:id

adminRouter.get("/logadmin", admin.logAdmin) //----->  http://localhost:3001/admin/logadmin  PROBABLEMETE FALTEN CREDENCIALES¡¡IMPORTANT

//----POST *
adminRouter.post("/", admin.postAdmin ); // ----> POST http://localhost:3001/admin   { "name": "Nombre Apellido", "email": "nombre@gmail.com", "password": "1234" } 


//----PUT *
adminRouter.put("/:id", admin.putAdmin) //----> PUT http://localhost:3001/admin

adminRouter.put("/passwordadmin", admin.passwordAdmin ) // --> PUT http://localhost:3001/admin/passwordadmin - Para reestablecer una contraseña sin iniciar sesión (porque se le olvidó cual era) { "email": ""} PROBABLEMETE FALTEN CREDENCIALES¡¡IMPORTANT

adminRouter.put("/passwordadmin/:id", admin.idPutSecond) // --> PUT http://localhost:3001/admin/passwordAdmin/:id - Para reestablecer una contraseña con la sesión iniciada {} : PROBABLEMETE FALTEN CREDENCIALES¡¡IMPORTANT


//----DELETE *
adminRouter.delete("/:id", admin.deleteAdmin ); // ---> http://localhost:3001/admin


module.exports = adminRouter;