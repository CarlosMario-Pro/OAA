const express = require("express");
const logAdmin = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

logAdmin.get("/", async (req, res) => {
  const session = await mongoose.startSession();
  const { email, password } = req.body;
  try {
    await session.withTransaction(async (session) => {
      const admin = await User.findOne({ email }).session(session);
      if (!admin) {
        return res.status(404).json({
          message: `Email incorrecto`,
        });
      }
      const match = await bcrypt.compare(password, admin.password);
      if (!match) {
        return res.status(404).json({ message: `Contraseña incorrecta` });
      }
      return res.status(200).json(admin);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al iniciar sesión";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
});

module.exports = logAdmin;
