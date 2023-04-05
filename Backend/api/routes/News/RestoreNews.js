const express = require("express");
const restoreNews = express.Router(); 
const News = require("../../models/News");
const mongoose = require("mongoose");


restoreNews.put("/:id", async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    try {
        const news = await News.findById(id);
        if (!news) {
            return res.status(404).json({ message: "Noticia no encontrada" });
        }
        news.isDeleted = true;
        await news.save();
        res.status(200).json({ message: "Noticia eliminada exitosamente" });

    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al eliminar la noticia";
        return res.status(status).json({ message });
    }
});


module.exports = restoreNews;