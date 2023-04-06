const express = require("express");
const getAdmin = express.Router();
const User = require("../../models/User");
const mongoose = require("mongoose");

//--> GET http://localhost:3001/getAdmin | Trae a todos los administradores

getAdmin
  .get("/", async (req, res) => {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async (session) => {
        const admins = await User.find({}).session(session);
        return res.status(200).json(admins);
      });
    } catch (error) {
      console.error(error);
      const status = error.status || 500;
      const message =
        error.message || "Ocurrió un error al obtener a los administradores";
      return res.status(status).json({ message });
    } finally {
      await session.endSession();
    }
  })
  //--> GET http://localhost:3001/getAdmin/:id | Trae a un solo administrador
  .get("/:id", async (req, res) => {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async (session) => {
        const admin = await User.findById(req.params.id).session(session);
        return res.status(200).json(admin);
      });
    } catch (error) {
      console.error(error);
      const status = error.status || 500;
      const message =
        error.message || "Ocurrió un error al obtener al administrador";
      return res.status(status).json({ message });
    } finally {
      await session.endSession();
    }
  });

module.exports = getAdmin;
