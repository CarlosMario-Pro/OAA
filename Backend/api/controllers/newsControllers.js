const mongoose = require("mongoose");
const News = require("../models/News");

const getNews = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const news = await News.find({}).session(session);
      return res.status(200).json(news.reverse());
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al obtener las noticias";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const getOneNews = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const news = await News.findById(id).session(session);
      if (!news) {
        return res.status(404).json({ message: "La noticia no se encontró" });
      }
      return res.status(200).json(news);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al obtener la noticia";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const getThreeNews = async (req, res) => {
    const session = await mongoose.startSession();
  
    try {
      await session.withTransaction(async (session) => {
        const news = await News.find({})
          .sort({date: -1}) // ordenar por fecha de creación descendente
          .limit(3) // limitar a 3 resultados
          .session(session);
        return res.status(200).json(news);
      });
    } catch (error) {
      console.error(error);
      const status = error.status || 500;
      const message = error.message || "Ocurrió un error al obtener las noticias";
      return res.status(status).json({ message });
    } finally {
      await session.endSession();
    }

const getThreeNewsByCategory = async (req, res) => {
    const { category } = req.params;
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async (session) => {
        const news = await News.find({ category: category })
          .sort({ date: -1 })
          .limit(3)
          .session(session);
        return res.status(200).json(news);
      });
    } catch (error) {
      console.error(error);
      const status = error.status || 500;
      const message =
        error.message || "Ocurrió un error al obtener las noticias";
      return res.status(status).json({ message });
    } finally {
      await session.endSession();
    }
  };
  
const postNews = async (req, res) => {
  const {
    titleMain,
    date,
    category,
    author,
    urlAuthor,
    location,
    introduction,
    images,
    description,
    labels,
  } = req.body;
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async (session) => {
      let existNews = await News.findOne({ titleMain }).session(session);
      if (existNews) {
        return res.status(409).json({
          message: `La noticia con el título: "${titleMain}" ya existe`,
        });
      }
      const [createdNews] = await News.create(
        [
          {
            titleMain,
            date,
            category,
            author,
            urlAuthor,
            location,
            introduction,
            images,
            description,
            labels,
          },
        ],
        { session }
      );
      res.status(200).json(createdNews);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al crear la noticia";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const putNews = async (req, res) => {
  const { id } = req.params;
  const {
    titleMain,
    date,
    category,
    author,
    urlAuthor,
    location,
    introduction,
    images,
    description,
    labels,
  } = req.body;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const updatedNews = await News.findByIdAndUpdate(
        id,
        {
          titleMain,
          date,
          category,
          author,
          urlAuthor,
          location,
          introduction,
          images,
          description,
          labels,
        },
        { new: true, session }
      );

      if (!updatedNews) {
        return res
          .status(404)
          .json({ message: `La noticia con ID ${id} no fue encontrada` });
      }

      res.status(200).json(updatedNews);
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message =
      error.message || "Ocurrió un error al actualizar la noticia";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const removeNews = async (req, res) => {
  const id = req.params.id;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const news = await News.findById(id);
      if (!news) {
        return res.status(404).json({ message: "Noticia no encontrada" });
      }
      news.isDeleted = true;
      await news.save();
      res.status(200).json({ message: "Noticia eliminada exitosamente" });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al eliminar la noticia";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const reactiveNews = async (req, res) => {
  const id = req.params.id;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async (session) => {
      const news = await News.findById(id);
      if (!news) {
        return res
          .status(404)
          .json({ message: `La publicación con id ${id} no fue encontrada` });
      }
      news.isDeleted = false;
      await news.save();
      res.status(200).json({ message: "Noticia reactivada exitosamente" });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al reactivar la noticia";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

const deleteNews = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const deletedNews = await News.findById(id).session(session);
      if (!deletedNews) {
        const message = `La publicación con id ${id} no fue encontrada`;
        return res.status(404).json({ message });
      }
      await deletedNews.deleteOne();
      return res
        .status(204)
        .json({ message: `News ${id} eliminada exitosamente` });
    });
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Ocurrió un error al borrar la News";
    return res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

module.exports = {
  getNews,
  getOneNews,
  getThreeNews,
  getThreeNewsByCategory,
  postNews,
  putNews,
  removeNews,
  reactiveNews,
  deleteNews,
};
