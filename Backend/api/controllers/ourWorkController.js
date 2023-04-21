const mongoose = require("mongoose");
const OurWork = require("../models/OurWork");

const getOurWork = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async (session) => {
      const ourWork = await OurWork.find({}).session(session);
      return res.status(200).json(ourWork);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al obtener OurWork";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const getOurWorkById = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async (session) => {
      const ourWork = await OurWork.findById(req.params.id).session(session);
      return res.status(200).json(ourWork);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener una seccion de OurWork suscriptor.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const postOurWork = async (req, res) => {
  const { title, content, image, information, extraData, isFinished} = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const newOurWork = new OurWork({
        title, content, image, information, extraData, isFinished
      });
      await newOurWork.save({ session });
      return res.status(201).json(newOurWork);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al crear OurWork";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const putOurWork = async (req, res) => {
  const { id } = req.params;
  const { title, content, image, information, extraData, isFinished } = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const updatedOurWork = await OurWork.findByIdAndUpdate(
        id,
        { title, content, image, information, extraData, isFinished },
        { new: true, session }
      );
      if (!updatedOurWork) {
        return res.status(404).json({ message: "OurWork no encontrado" });
      }
      return res.status(200).json(updatedOurWork);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al actualizar OurWork";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};


const deleteOurWork = async (req, res) => {
  const id = req.params.id;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const work = await OurWork.findById(id);
      if (!work) {
        return res.status(404).json({ message: "OurWork no encontrado" });
      }
      work.isDeleted = true;
      await work.save();
      res.status(200).json({ message: " EliminadO exitosamente" });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al eliminar OURWork";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const restoreOurWork = async (req, res) => {
  const id = req.params.id;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const work = await OurWork.findById(id);
      if (!work) {
        return res.status(404).json({ message: "No encontrada" });
      }
      work.isDeleted = false;
      await work.save();
      res.status(200).json({ message: "Restaurado exitosamente" });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al Restaurar";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};


module.exports = {
  getOurWork,
  getOurWorkById,
  postOurWork,
  putOurWork,
  deleteOurWork,
  restoreOurWork
};