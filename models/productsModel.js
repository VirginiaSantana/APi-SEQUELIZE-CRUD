//DataTypes es una función de Sequelize para definir el tipo de datos que vamos a trabajar en nuestro proyecto.
import db from '../database/db.js';
import { DataTypes } from 'sequelize';

//Creamos la constante ProductsModel que se va a utilizar para definir lo que contiene nuestra base de datos con DataType.
const ProductsModel = db.define('products', {
  product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true },
  product_name: { type: DataTypes.STRING },
  stock_unit: { type: DataTypes.INTEGER},
  product_description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT },
  //brand_id: { type: DataTypes.INTEGER, allowNull: false, //Las líneas 11 y 12 van juntas. Permite que el brand_id pueda estar vacío
 // validate: {isInt: true, min: 1}, //Si no estuviera vacío, tiene que ser mínimo 1.
  //references: { model: "brands", key: "brand_id" }
},{
  timestamps: false
});

export default ProductsModel; 

/*import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const ProductsModel = db.define('products', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand_id: {
    type: DataTypes.INTEGER
  },
  stock_unit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
  }
}, {
  timestamps: false
});

export default ProductsModel;
*/

