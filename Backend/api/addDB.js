const News = require("./models/News");
const NewsDB = require("./additional/NewsDB");

async function loadedNews() {
  try {
    const count = await News.countDocuments(); //Obtener la cantidad de documentos en la colección 'Products' de la DB.
    if (count > 0) {
      //Si hay algún documento presente, la función simplemente imprime "Productos cargados anteriormente" y finaliza.
      console.log("News cargadas anteriormente");
      return;
    }
    await News.insertMany(NewsDB); //Se inserta todos los documentos de productos (contenidos en el array products) en la colección 'Products' usando Products.insertMany(products).
    console.log("NewsDB en Mongo Atlas"); //El resultado de esta consulta se imprime por consola
  } catch (err) {
    console.log(err);
    return;
  }
}

module.exports = { loadedNews };
