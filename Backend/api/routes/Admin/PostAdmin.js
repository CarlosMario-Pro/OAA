const express = require("express");
const postAdmin = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

postAdmin.post("/", async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 8);

    await session.withTransaction(async (session) => {
      let existAdmin = await User.findOne({ email }).session(session);
      if (existAdmin) {
        return res.status(409).json({
          message: `Ya existe una cuenta de administrador con el email: ${email}`,
        });
      }
      const [createdAdmin] = await User.create(
        [{ name, email, password: passwordHash }],
        {
          session,
        }
      );
      res.status(200).json({
        id: createdAdmin._id,
        name: createdAdmin.name,
        email: createdAdmin.email,
        password: createdAdmin.password,
      });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al crear una nueva cuenta de administrador";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
});

module.exports = postAdmin;

/*
POST http://localhost:3001/postAdmin

{
    "name": "Nombre Apellido",
    "email": "nombre@gmail.com",
    "password": "1234"
}
*/
