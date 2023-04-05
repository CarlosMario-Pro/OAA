const express = require("express");
const getNews = express.Router(); 
const News = require("../../models/News");
const mongoose = require("mongoose");


getNews.get("/getNews",async(req,res)=>{        //--> http://localhost:3001/getNews/getNews AVERIGUAR POR QUÉ es doble /getNews/getNews
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
});


module.exports = getNews;