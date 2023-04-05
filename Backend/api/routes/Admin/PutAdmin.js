const express = require("express");
const putAdmin = express.Router();
const User = require("../../models/User");
const mongoose = require("mongoose");

putAdmin.put("/:id", async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { id } = req.params;
    const { name, email } = req.body;

    await session.withTransaction(async (session) => {
      const updatedAdmin = await User.findByIdAndUpdate(
        id,
        {
          name,
          email,
        },
        { session }
      );

      if (!updatedAdmin) {
        return res.status(404).json({
          message: `El administrador con ID ${id} no fue encontrado`,
        });
      }

      res.status(200).json({
        id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        password: updatedAdmin.password,
      });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al actualizar al administrador";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
});

/*
PUT http://localhost:3001/putAdmin/:id

{
    "name": "Nombre Apellido",
    "email": "",
    password: ""
}
*/

module.exports = putAdmin;
