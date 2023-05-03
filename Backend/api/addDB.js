const News = require("./models/News");                  //Modelo 
const news = require("./additional/NewsDB");
const Galleries = require("./models/Galleries");        //Modelo
const galleries = require("./additional/GalleryDB");
const OurWorks = require("./models/OurWorks");          //Modelo
const works = require("./additional/OurWorkDB");

async function loadedNews() {
  try {
    const count = await News.countDocuments();          //Obtener la cantidad de documentos en la colección 'News' de la DB.
    if (count > 0) {
      console.log("Noticias cargadas anteriormente");   //Si hay algún documento presente, la función simplemente imprime "Noticias cargadas anteriormente" y finaliza.
      return;
    }
    await News.insertMany(news);                        //Se inserta todos los documentos de productos (contenidos en el array count) en la colección 'News' usando News.insertMany(news).
    console.log("NewsDB en Mongo Atlas");               //El resultado de esta consulta se imprime por consola
  } catch (err) {
    console.log(err);
    return;
  }
}

async function loadedGalleries() {
  try {
    const count = await Galleries.countDocuments();
    if (count > 0) {      
      console.log("Galería cargada anteriormente");
      return;
    }
    await Galleries.insertMany(galleries);
    console.log("GalleryDB en Mongo Atlas");
  } catch (err) {
    console.log(err);
    return;
  }
}

async function loadedWorks() {
  try {
    const count = await OurWorks.countDocuments();
    if (count > 0) {
      console.log("sección 'Nuestro trabajo' cargado anteriormente");
      return;
    }
    await OurWorks.insertMany(works);
    console.log("WorksDB en Mongo Atlas");
  } catch (err) {
    console.log(err);
    return;
  }
}

//Reiniciar los modelos de la base de datos
// News.deleteMany({})
//   .then(() => console.log("'News' removidas"))
//   .catch((err) => console.log(err));


// Galleries.deleteMany({})
//   .then(() => console.log("'Galleries' removidas"))
//   .catch((err) => console.log(err));


// OurWorks.deleteMany({})
//   .then(() => console.log("'OurWorks' removidas"))
//   .catch((err) => console.log(err));


module.exports = { loadedNews, loadedGalleries, loadedWorks };
