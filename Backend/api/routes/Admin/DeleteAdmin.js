const express = require("express");
const deleteAdmin = express.Router();
const User = require("../../models/User");
const mongoose = require("mongoose");

//--> http://localhost:3001/deleteAdmin/:id

deleteAdmin.delete("/:id", async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const deletedAdmin = await User.findByIdAndRemove(req.params.id).session(
        session
      );
      if (!deletedAdmin) {
        return res.status(404).send({ message: "No se encontró al usuario" });
      }
      res.send({ message: "El administrador fue eliminado exitosamente" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al eliminar al administrador" });
  } finally {
    await session.endSession();
  }
});

module.exports = deleteAdmin;
