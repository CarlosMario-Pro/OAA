const News = require("./models/News");
const news = require("./additional/NewsDB");
const Galleries = require("./models/Galleries");
const galleries = require("./additional/GalleryDB");
const OurWorks = require("./models/OurWorks");
const works = require("./additional/OurWorkDB");

async function loadedNews() {
  try {
    const count = await News.countDocuments(); //Obtener la cantidad de documentos en la colección 'Products' de la DB.
    if (count > 0) {
      //Si hay algún documento presente, la función simplemente imprime "Productos cargados anteriormente" y finaliza.
      console.log("Noticias cargadas anteriormente");
      return;
    }
    await News.insertMany(news); //Se inserta todos los documentos de productos (contenidos en el array products) en la colección 'Products' usando Products.insertMany(products).
    console.log("NewsDB en Mongo Atlas"); //El resultado de esta consulta se imprime por consola
  } catch (err) {
    console.log(err);
    return;
  }
}

async function loadedGalleries() {
  try {
    const count = await Galleries.countDocuments(); //Obtener la cantidad de documentos en la colección 'Products' de la DB.
    if (count > 0) {
      //Si hay algún documento presente, la función simplemente imprime "Productos cargados anteriormente" y finaliza.
      console.log("Galería cargada anteriormente");
      return;
    }
    await Galleries.insertMany(galleries); //Se inserta todos los documentos de productos (contenidos en el array products) en la colección 'Products' usando Products.insertMany(products).
    console.log("GalleryDB en Mongo Atlas"); //El resultado de esta consulta se imprime por consola
  } catch (err) {
    console.log(err);
    return;
  }
}

async function loadedWorks() {
  try {
    const count = await OurWorks.countDocuments(); //Obtener la cantidad de documentos en la colección 'Products' de la DB.
    if (count > 0) {
      //Si hay algún documento presente, la función simplemente imprime "Productos cargados anteriormente" y finaliza.
      console.log("sección 'Nuestro trabajo' cargado anteriormente");
      return;
    }
    await OurWorks.insertMany(works); //Se inserta todos los documentos de productos (contenidos en el array products) en la colección 'Products' usando Products.insertMany(products).
    console.log("WorksDB en Mongo Atlas"); //El resultado de esta consulta se imprime por consola
  } catch (err) {
    console.log(err);
    return;
  }
}

module.exports = { loadedNews, loadedGalleries, loadedWorks };
