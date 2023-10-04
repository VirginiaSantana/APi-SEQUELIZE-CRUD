//Aquí va una constante con los datos para conectar con MySQL
//Este método solo funciona con Sequelize
import { Sequelize } from 'sequelize';

const db = new Sequelize({
  dialect: 'mysql', 
  host: 'localhost', 
  username: 'root', 
  password: '',
  database: 'products_app', 
});

//Se usa para confirmar que se haya conectado la database con el servidor
try { 
  await db.authenticate();
  console.log('Conected to database');
} catch (error) {
  console.log(`Error: ${error}`);
}

export default db;

