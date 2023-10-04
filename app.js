import express from "express"; //Librería con métodos que se pueden aplicar al código para hacerlo más fácil.
import cors from 'cors'; //Ayuda a hacer solicitudes http al servidor de manera segura.
import db from "./database/db.js"
import productsRoutes from './routes/productsRoutes.js' 

export const app = express();

// Ruta de inicio
app.get('/', (_req, res) =>{
  res.send('Hola API Products');
});

app.use(cors());//Permite que la API sea accesible desde otros servidores. 
app.use(express.json()); //Para que los datos se muestren en formato json.
app.use('/products', productsRoutes); //La ruta donde se ve todo lo que hay en la database (productsRoutes está en la carpeta routes)

// Importante para poder parar el servidor dentro de los tests
export const server = app.listen(8000, () => {
  console.log('🚀 Server up in http://localhost:8000/');
});
