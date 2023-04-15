const mongoose = require("mongoose");
const News = require("../models/News");


const getNews = async (req, res) => {
    const session = await mongoose.startSession();
    
    try {
        await session.withTransaction(async (session) => {
            const news = await News.find({}).session(session);
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
      const message =
        error.message || "Ocurrió un error al obtener la noticia";
      return res.status(status).json({ message });
    } finally {
      await session.endSession();
    }
};


const postNews = async (req, res) => {
    const { titleMain, category, date, author, introduction, description, image, location, video, source, read_time } = req.body;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            let existNews = await News.findOne({ titleMain }).session(session);
            if (existNews) {
                return res.status(409).json({ message: `La noticia con ${titleMain} ya existe` });
            }
            const [createdNews] = await News.create(
                [ {titleMain, category, date, author, introduction, description, image, location, video, source, read_time } ],
                { session }
            );
            res.status(200).json({
                id: createdNews._id,
                titleMain: createdNews.titleMain,
                category: createdNews.category,
                date: createdNews.date,
                author: createdNews.author,
                introduction: createdNews.introduction,
                description: createdNews.description,
                image: createdNews.image,
                location: createdNews.location,
                video: createdNews.video,
                source: createdNews.source,
                read_time: createdNews.read_time,
            });
        });

    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al crear la noticia";
        return res.status(status).json({ message });
    } finally {
        await session.endSession();
    }
}


const putNews = async (req, res) => {
    const { id } = req.params;
    const { titleMain, category, date, author, introduction, description, image, location, video, source, read_time } = req.body;
    const session = await mongoose.startSession();
  
    try {
        await session.withTransaction(async (session) => {
            const updatedNews = await News.findByIdAndUpdate(
                id,
                { titleMain, category, date, author, introduction, description, image, location, video, source, read_time },
                { new: true, session }
            );
          
            if (!updatedNews) {
                return res.status(404).json({ message: `La noticia con ID ${id} no fue encontrada` });
            }
          
            res.status(200).json({
                id: updatedNews._id,
                titleMain: updatedNews.titleMain,
                category: updatedNews.category,
                date: updatedNews.date,
                author: updatedNews.author,
                introduction: updatedNews.introduction,
                description: updatedNews.description,
                image: updatedNews.image,
                location: updatedNews.location,
                video: updatedNews.video,
                source: updatedNews.source,
                read_time: updatedNews.read_time,
            });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al actualizar la noticia";
        return res.status(status).json({ message });
    } finally {
        await session.endSession();
    }
};


const restoreNews = async (req, res) => {
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
    }
};


const deleteNews = async (req, res) => {
    const { id } = req.params;
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            const deletedNews = await News.findById(id).session(session);
            if (!deletedNews) {
                const message = `News con id ${id} no fue encontrada`;
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
    postNews,
    putNews,
    restoreNews,
    deleteNews
};