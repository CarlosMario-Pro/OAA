const express = require("express");
const putNews = express.Router(); 
const News = require("../../models/News");
const mongoose = require("mongoose");


putNews.put("/:id", async(req,res)=>{
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
    });


module.exports = putNews;


/*
PUT http://localhost:3001/putNews
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