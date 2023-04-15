const mongoose = require("mongoose");
const Newsletter = require("../models/Newsletter");

const getNewsletters = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const newsletter = await Newsletter.find({}).session(session);
      return res.status(200).json(newsletter.reverse());
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al obtener Newsletter";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const getNewsletterById = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async (session) => {
      const newsletter = await Newsletter.findById(req.params.id).session(
        session
      );
      return res.status(200).json(newsletter);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener al un suscriptor.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const postNewsletter = async (req, res) => {
  const { name, email } = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const newsletter = new Newsletter({
        name,
        email,
      });
      await newsletter.save({ session });
      return res.status(201).json(newsletter);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al crear Newsletter";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const deleteNewsletter = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const newsletter = await Newsletter.findById(id).session(session);
      if (!newsletter) {
        const message = `Newsletter con id ${id} no encontrado`;
        return res.status(404).json({ message });
      }
      await newsletter.deleteOne({ session });
      return res
        .status(204)
        .json({ message: "La eliminacion se realizó con éxito" });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || `Ocurrió un error al eliminar Newsletter con id ${id}`;
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

module.exports = {
  getNewsletters,
  getNewsletterById,
  postNewsletter,
  deleteNewsletter,
};
