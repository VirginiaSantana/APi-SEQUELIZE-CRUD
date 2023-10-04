//Aquí se hace el CRUD
import ProductsModel from "../models/productsModel.js";

//GET -> Trae los datos que tenemos en nuestra base de datos. Hacemos la constante que nos va a traer los productos.

export const GetAllProducts = async (_req, res) => {
  try {
    const products = await ProductsModel.findAll(); //La constante "products" nos trae todo lo que haya dentro del produtsModel.
    res.json(products); //La respuesta sea en tipo json
  } catch (error) { //Devuelve un error si hubiera algún problema al hacer el GET
    handleErrorResponse(res, error);
  }
};

//CREATE -> Crea un nuevo producto. 

export const CreateProduct = async (req, res) => {
  try {
    const productData = extractProductData(req.body);

    if (validateProductData(productData)) {
      await ProductsModel.create(productData);
      res.json({ message: "The product has been created successfully!" });
    } else {
      res.status(500).json({ message: "Invalid product data" });
    }
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

function extractProductData(body) {
  const { product_name, brand_name, stock_unit, product_description, price } = body;
  return { product_name, brand_name, stock_unit, product_description, price };
}

function validateProductData(productData) {
  const { product_name, brand_name, stock_unit, product_description, price } = productData;
  return product_name && stock_unit && product_description && typeof price === "number" && brand_name >= 1;
}

function handleErrorResponse(res, error) {
  res.status(500).json({ message: error.message });
}

// DELETE -> Borrar un producto ya creado.

export const DeleteProduct = async (req, res) => {
  const { id } = req.params; //Extrae el valor de "id" de los parámetros de la solicitud.
  try {
    const product = await ProductsModel.findByPk(id); //Busca un producto en la base de datos según su "id".

    if (!product) { //Verifica si la variable "product" es falsa o nula.
      return res.status(404).json({ message: "Product not found" }); //Si no se encuentra el producto en la base de datos, se envía mensaje de no encontrado.
    }

    await product.destroy(); //Si el producto no es nulo y se destruye/elimina de la base de datos.

    return res.status(200).json({ message: "Product deleted successfully" }); //Si se elimina el producto, se envía una respuesta de éxito.
  } catch (error) { //Maneja el posible error que pueda surgir
    return res.status(500).json({ message: error.message }); //Indica un error en el servidor que impidió la solicitud se completara con éxito.
  }
};

//UPDATE -> Función para actualizar un producto (PUT)
export const UpdateProduct = async (req, res) => { //Obtiene el ID del producto que se desea actualizar a partir de la URL de la solicitud.
  try {
    const { id } = req.params;
    const { product_name, brand_name, stock_unit, product_description, price } = req.body; //Desestructura el objeto "body" de la solicitud "req" para obtener los valores de product_id,...
//Resumen: extrae el ID del producto de los parámetros de la solicitud y la nueva información del producto del cuerpo de la solicitud para realizar una actualización en la base de datos.
    if (!product_name || !stock_unit || !product_description || !brand_name || typeof stock_unit !== "number" || brand_name < 1) {
      return res.status(400).json({ message: "Invalid product data" }); //Si alguno de estos campos falta o no cumple con los criterios de validación, devuelve un error.
    }

    const product = await ProductsModel.findByPk(id); //Busca un producto en la base de datos según su "id" utilizando Sequelize.
//Si lo encuentra, almacena el resultado en la variable "product"
    if (!product) { //Si no se encuentra ningún producto con el id especificado en la base de datos, la variable "product" será nula. 
      return res.status(404).json({ message: "Product not found" }); //Se devuelve una respuesta HTTP con un error 404 junto con un objeto json.
    }
//Se asigna el nuevo valor en cada línea.
    product.product_name = product_name; 
    product.brand_name = brand_name;
    product.stock_unit = stock_unit;
    product.product_description = product_description;
    product.price = price;
    await product.save(); //Se guardan los cambios.

    return res.status(200).json({ message: "Product updated successfully" });//Maneja las respuestas de las peticiones.
  } catch (error) { //Si da error emite un mensaje de error 500 y se incluye en la respuesta json.
    return res.status(500).json({ message: error.message });
  }
};
