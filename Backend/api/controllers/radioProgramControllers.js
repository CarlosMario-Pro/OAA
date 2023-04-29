const mongoose = require("mongoose");
const RadioPrograms = require("../models/RadioPrograms");

// ---- GET *
//Traer a todos los datos del programa de radio.
const getRadioPrograms = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const radioPrograms = await RadioPrograms.find({}).session(session);
      return res.status(200).json(radioPrograms.reverse());
    });
  } catch (error) {
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos del programa de radio.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//Traer a todos los datos activos del programa de radio.
const getActiveRadioPrograms = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const radioPrograms = await RadioPrograms.find({
        isDeleted: false,
      }).session(session);
      return res.status(200).json(radioPrograms);
    });
  } catch (error) {
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos del programa de radio.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//Traer a un dato del programa de radio.
const getRadioProgramById = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const radioProgram = await RadioPrograms.findById(id).session(session);
      if (!radioProgram) {
        return res
          .status(404)
          .json({ message: "El programa de radio no se encontró" });
      }
      return res.status(200).json(radioProgram);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener el programa de radio.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//Traer a un dato activo del programa de radio.
const getActiveRadioProgramById = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const radioProgram = await RadioPrograms.findById(id).session(session);
      if (!radioProgram || radioProgram.isDeleted) {
        return res
          .status(404)
          .json({ message: "El programa de radio no se encontró" });
      }
      return res.status(200).json(radioProgram);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener el programa de radio.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//----POST *
//Crear una nueva transmisión del programa de radio.
const postRadioProgram = async (req, res) => {
  const {
    titleMain,
    date,
    introduction,
    image,
    audio,
    multimedia,
    labels,
    extraData,
  } = req.body;

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async (session) => {
      let existRadioProgram = await RadioPrograms.findOne({
        titleMain,
      }).session(session);
      if (existRadioProgram) {
        return res.status(409).json({
          message: `El programa de radio con el título: "${titleMain}" ya existe`,
        });
      }
      const [createdRadioProgram] = await RadioPrograms.create(
        [
          {
            titleMain,
            date,
            introduction,
            image,
            audio,
            multimedia,
            labels,
            extraData,
          },
        ],
        { session }
      );
      res.status(200).json(createdRadioProgram);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al crear el programa de radio.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};
//----PUT *
// Editar una transmisión del programa de radio.
const putRadioProgram = async (req, res) => {
  const { id } = req.params;
  const {
    titleMain,
    date,
    introduction,
    image,
    audio,
    multimedia,
    labels,
    extraData,
  } = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const updatedRadioProgram = await RadioPrograms.findByIdAndUpdate(
        id,
        {
          titleMain,
          date,
          introduction,
          image,
          audio,
          multimedia,
          labels,
          extraData,
        },
        { new: true, session }
      );

      if (!updatedRadioProgram) {
        return res.status(404).json({
          message: `El programa de radio con ID ${id} no fue encontrado.`,
        });
      }

      res.status(200).json(updatedRadioProgram);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al actualizar el programa de radio.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

// Eliminar un archivo con borrado lógico
const deactivateRadioProgram = async (req, res) => {
  const id = req.params.id;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const radioProgram = await RadioPrograms.findById(id);
      if (!radioProgram) {
        return res
          .status(404)
          .json({ message: "Programa de radio no encontrado." });
      }
      radioProgram.isDeleted = true;
      await radioProgram.save();
      res
        .status(200)
        .json({ message: "Programa de radio eliminada exitosamente." });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al eliminar el programa de radio.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

// Recuperar un archivo con borrado lógico
const activateRadioProgram = async (req, res) => {
  const id = req.params.id;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const radioProgram = await RadioPrograms.findById(id);
      if (!radioProgram) {
        return res.status(404).json({
          message: `El programa de radio con id ${id} no fue encontrado.`,
        });
      }
      radioProgram.isDeleted = false;
      await radioProgram.save();
      res
        .status(200)
        .json({ message: "Programa de radio reactivada exitosamente." });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al reactivar el programa de radio.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//----DELETE *
// Borrado real
const deleteRadioProgram = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const deletedRadioProgram = await RadioPrograms.findById(id).session(
        session
      );
      if (!deletedRadioProgram) {
        const message = `El programa de radio con id ${id} no fue encontrado.`;
        return res.status(404).json({ message });
      }
      await deletedRadioProgram.deleteOne();
      return res
        .status(204)
        .json({ message: `Programa de radio eliminado exitosamente.` });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al borrar el programa de radio.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

module.exports = {
  getRadioPrograms,
  getActiveRadioPrograms,
  getRadioProgramById,
  getActiveRadioProgramById,
  postRadioProgram,
  putRadioProgram,
  deactivateRadioProgram,
  activateRadioProgram,
  deleteRadioProgram,
};
