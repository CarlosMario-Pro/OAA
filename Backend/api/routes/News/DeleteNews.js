const express = require('express');
const deleteNews = express.Router();
const News = require("../../models/News");


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