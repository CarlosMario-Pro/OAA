const express = require('express');
const deleteNews = express.Router();
const News = require("../../models/News");

// Ruta para eliminar una noticia por ID
deleteNews.delete('/:id', async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndRemove(req.params.id);
    if (!deletedNews) {
      return res.status(404).send({ message: 'No se encontró la noticia' });
    }
    res.send({ message: 'Noticia eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al eliminar la noticia' });
  }
});

module.exports = deleteNews;
/*
En esta ruta, estamos utilizando el método delete() de Express.js para crear una ruta que elimine una noticia por su ID. La ruta recibe el parámetro de la ID de la noticia en la URL.

Luego, dentro de la función controladora de la ruta, utilizamos el método findByIdAndDelete() de Mongoose para buscar y
*/


