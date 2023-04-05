const News = require("./models/News");
const Users = require("./models/User");
const Categories = require("./models/Categories");
const Comments = require("./models/Comments");
const Favorites = require("./models/Favorites");
const NewsDB = require("./additional/NewsDB");
const CategoriesNews = require("./additional/CategoriesNews");  //Constante que contiene las categorias de los productos


async function loadedCategories() {                             //Función asincrónica que carga las categorías en una base de datos de MongoDB
    try {                                                       //Intentamos encontrar la cantidad de documentos en una columna
        const count = await Categories.countDocuments();        //Intentar contar el número de documentos en la colección de categorías
        if (count > 0) {                                        //Si es mayor a 0, es decir, si hay
            console.log("Categories cargadas anteriormente");
            return;
        }
        await Categories.insertMany(CategoriesNews);                //Si es cero, se insertan todas las categorías que están en la constante 'categories' en el additional
        console.log("Categories en mongo Atlas");
    } catch (err) {
        console.log(err);
        return;
    }
};


async function loadedNews() {
    try {
        const count = await News.countDocuments();                  //Obtener la cantidad de documentos en la colección 'Products' de la DB.
        if (count > 0) {                                                //Si hay algún documento presente, la función simplemente imprime "Productos cargados anteriormente" y finaliza.
            console.log("News cargadas anteriormente");
            return;
        }
        const promesas = NewsDB.map((e) => {                          //Si no hay productos, itera la constante 'products' que es donde están todos los productos
            return Categories.findOne({ category: e.category }).exec(); //Por cada product se ejecuta una consulta en 'Categories' con findOne({ category: e.category }).exec(). Busca la categoría correspondiente al producto actual y devuelve una promesa.
        });
        const ids = await Promise.all(promesas);                        //Se devuelve una promesa que resuelve con el documento de la categoría.
        const idSolos = ids.map((e) => [e._id].join(""));               //Una vez que se tienen todos los IDs de las categorías, se genera un array idSolos que contiene sólo los IDs (como strings) de las categorías. Para ello, la función itera sobre el array de IDs y por cada uno de ellos ejecuta [e._id].join(""), que convierte el ID a un string y lo agrega al array idSolos.
        for (let i = 0; i < NewsDB.length; i++) {                     //Se itera la constante 'products'y por cada uno de ellos compara su categoría con la categoría correspondiente obtenida en 'const ids = await Promise.all(promesas)'
            if (NewsDB[i].category === ids[i].category) {             //Si ambas categorías coinciden, recordemos que en la constante 'products'
                NewsDB[i].category = idSolos[i];                      //Se reemplaza la categoría del producto con su respectivo ID (como string) en el array products.
            }
        }
        await News.insertMany(NewsDB);                            //Se inserta todos los documentos de productos (contenidos en el array products) en la colección 'Products' usando Products.insertMany(products).
        const relacionadas = await News.find({}).populate("category").exec();   //realiza una consulta para obtener todos los productos de la colección Products, y luego se asocia cada producto con su respectiva categoría mediante populate("category").
        console.log("NewsDB en Mongo Atlas");                         //El resultado de esta consulta se imprime por consola
    } catch (err) {
        console.log(err);
        return;
    }
};


module.exports = { loadedCategories, loadedNews };