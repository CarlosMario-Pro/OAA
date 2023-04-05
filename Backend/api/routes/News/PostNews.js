const express = require("express");
const postNews = express.Router(); 
const News = require("../../models/News");
const mongoose = require("mongoose");


postNews.post("/postNews", async(req,res)=>{       //tener cuidado, si en el index creo la ruta 'postUsers' no la puedo pasar de nuevo aquí
    const {titleMain, category, date, author, introduction, description, image, location, video, source, read_time } = req.body;
    console.log(req.body);
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
});


module.exports = postNews;

/*
POST http://localhost:3001/postNews/postNews
Va SIN ID Y CON LA CATEGORIA CON EL ID QUE LE ASIGNO MONGODB EN LA COLECCION

{   
    "titleMain": "Primer",
    "category": "641092a33998ac12b0bb8686",
    "date": "16 de marzo de 2023",
    "author": "Por <a href=\"https://ambientalistas.org.ar/contenido/83/nosotrxs/\">OAA</a>",
    "introduction": "El Poder Primer noticia creada",
    "description": [
        "Primer noticia creada.",
        "Primer noticia creada"
    ],
    "image": [
        "http://ambientalistas.org.ar/download/multimedia.miniatura.a4aa927f520aab78.6174616e6f725f6d696e6961747572612e77656270.webp"
    ], 
    "location": "Mar del Plata, Argentina",
    "video": null,
    "source": null,
    "read_time": null
}

*/

