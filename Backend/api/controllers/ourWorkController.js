const mongoose = require("mongoose");
const OurWorks = require("../models/OurWorks");

// ---- GET *
//Traer a todos los datos de la seccion "nuestro trabajo"
const getOurWorks = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async (session) => {
      const works = await OurWorks.find({}).session(session);
      return res.status(200).json(works.reverse());
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//Traer a todos los datos activos de la seccion "nuestro trabajo"
const getActiveOurWorks = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async (session) => {
      const works = await OurWorks.find({ isDeleted: false }).session(session);
      return res.status(200).json(works);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener los archivos de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//Traer a un dato de la seccion "nuestro trabajo"
const getOurWorkById = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async (session) => {
      const work = await OurWorks.findById(req.params.id).session(session);
      if (!work) {
        return res.status(404).json({ message: "Publicación no encontrada" });
      }
      return res.status(200).json(work);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener un archivo de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//Traer a un dato activo de la seccion "nuestro trabajo"
const getActiveOurWorkById = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async (session) => {
      const work = await OurWorks.findById(req.params.id).session(session);
      if (!work) {
        return res.status(404).json({ message: "Publicación no disponible." });
      }
      return res.status(200).json(work);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al obtener un archivo de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//----POST *
//Crear un nuevo dato en la seccion "nuestro trabajo"
const postOurWork = async (req, res) => {
  const {
    titleMain,
    date,
    location,
    content,
    image,
    multimedia,
    extraData,
    isFinished,
    labels,
  } = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const newOurWorks = new OurWorks({
        titleMain,
        date,
        location,
        content,
        image,
        multimedia,
        extraData,
        isFinished,
        labels,
      });
      await newOurWorks.save({ session });
      return res.status(201).json(newOurWorks);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al crear un archivo de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//----PUT *
// Editar un archivo de la seccion "nuestro trabajo"
const putOurWork = async (req, res) => {
  const { id } = req.params;
  const {
    titleMain,
    date,
    location,
    content,
    image,
    multimedia,
    extraData,
    isFinished,
    labels,
  } = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const updatedOurWorks = await OurWorks.findByIdAndUpdate(
        id,
        {
          titleMain,
          date,
          location,
          content,
          image,
          multimedia,
          extraData,
          isFinished,
          labels,
        },
        { new: true, session }
      );
      if (!updatedOurWorks) {
        return res.status(404).json({ message: "Archivo no encontrado" });
      }
      return res.status(200).json(updatedOurWorks);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al actualizar un archivo de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

// Eliminar un archivo con borrado lógico
const deactivateOurWork = async (req, res) => {
  const id = req.params.id;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const work = await OurWorks.findById(id);
      if (!work) {
        return res.status(404).json({ message: "Archivo no encontrado" });
      }
      work.isDeleted = true;
      await work.save();
      res.status(200).json({ message: "Eliminado exitosamente" });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al eliminar un archivo de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

// Recuperar un archivo con borrado lógico
const activateOurWork = async (req, res) => {
  const id = req.params.id;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const work = await OurWorks.findById(id);
      if (!work) {
        return res.status(404).json({ message: "Archivo no encontrado" });
      }
      work.isDeleted = false;
      await work.save();
      res.status(200).json({ message: "Restaurado exitosamente" });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message ||
      "Ocurrió un error al restaurar un archivo de 'Nuestro Trabajo'.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//----DELETE *
// Borrado real
const deleteOurWork = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const deletedWork = await OurWorks.findById(id).session(session);
      if (!deletedWork) {
        const message = `El archivo con id ${id} no fue encontrada.`;
        return res.status(404).json({ message });
      }
      await deletedWork.deleteOne();
      return res
        .status(204)
        .json({ message: `Archivo eliminada exitosamente.` });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al borrar el archivo.";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

module.exports = {
  getOurWorks,
  getActiveOurWorks,
  getOurWorkById,
  getActiveOurWorkById,
  postOurWork,
  putOurWork,
  deactivateOurWork,
  activateOurWork,
  deleteOurWork,
};
