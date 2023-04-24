const mongoose = require("mongoose");
const Galleries = require("../models/Galleries");

// ---- GET *
//Traer a todos los datos de la galería
const getGalleries = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const galleries = await Galleries.find({}).session(session);
      return res.status(200).json(galleries.reverse());
    });
  } catch (error) {
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al obtener los archivos de la galería";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};
//Traer a un dato de la galería
const getOneGallery = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const gallery = await Galleries.findById(id).session(session);
      if (!gallery) {
        return res.status(404).json({ message: "La galería no se encontró" });
      }
      return res.status(200).json(gallery);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al obtener la galería";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//----POST *
//Crear un nuevo dato en la galería
const postGallery = async (req, res) => {
  const {
    titleMain,
    date,
    category,
    author,
    urlAuthor,
    introduction,
    image,
    video,
    multimedia,
    labels,
    extraData,
  } = req.body;

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async (session) => {
      let existGallery = await Galleries.findOne({ titleMain }).session(
        session
      );
      if (existGallery) {
        return res.status(409).json({
          message: `La galería con el título: "${titleMain}" ya existe`,
        });
      }
      const [createdGallery] = await Galleries.create(
        [
          {
            titleMain,
            date,
            category,
            author,
            urlAuthor,
            introduction,
            image,
            video,
            multimedia,
            labels,
            extraData,
          },
        ],
        { session }
      );
      res.status(200).json(createdGallery);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al crear la galería";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};
//----PUT *
// Editar un archivo de la galería
const putGallery = async (req, res) => {
  const { id } = req.params;
  const {
    titleMain,
    date,
    category,
    author,
    urlAuthor,
    introduction,
    image,
    video,
    multimedia,
    labels,
    extraData,
  } = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const updatedGallery = await Galleries.findByIdAndUpdate(
        id,
        {
          titleMain,
          date,
          category,
          author,
          urlAuthor,
          introduction,
          image,
          video,
          multimedia,
          labels,
          extraData,
        },
        { new: true, session }
      );

      if (!updatedGallery) {
        return res
          .status(404)
          .json({ message: `La galería con ID ${id} no fue encontrada` });
      }

      res.status(200).json(updatedGallery);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al actualizar la galería";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};
// Eliminar un archivo con borrado lógico
const removeGallery = async (req, res) => {
  const id = req.params.id;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const gallery = await Galleries.findById(id);
      if (!gallery) {
        return res.status(404).json({ message: "Galería no encontrada" });
      }
      gallery.isDeleted = true;
      await gallery.save();
      res.status(200).json({ message: "Galería eliminada exitosamente" });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al eliminar la galería";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

// Recuperar un archivo con borrado lógico
const reactiveGallery = async (req, res) => {
  const id = req.params.id;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const gallery = await Galleries.findById(id);
      if (!gallery) {
        return res
          .status(404)
          .json({ message: `La galería con id ${id} no fue encontrada` });
      }
      gallery.isDeleted = false;
      await gallery.save();
      res.status(200).json({ message: "Galería reactivada exitosamente" });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al reactivar la galería";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

//----DELETE *
// Borrado real
const deleteGallery = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const deletedGallery = await Galleries.findById(id).session(session);
      if (!deletedGallery) {
        const message = `La galería con id ${id} no fue encontrada`;
        return res.status(404).json({ message });
      }
      await deletedGallery.deleteOne();
      return res
        .status(204)
        .json({ message: `Galería eliminada exitosamente` });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al borrar la galería";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

module.exports = {
  getGalleries,
  getOneGallery,
  postGallery,
  putGallery,
  removeGallery,
  reactiveGallery,
  deleteGallery,
};
