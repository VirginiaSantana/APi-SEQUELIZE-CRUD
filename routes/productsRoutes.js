import express from "express";
import {
  GetAllProducts,
  CreateProduct,
  DeleteProduct,
  UpdateProduct
} from "../controllers/productsController.js"; 

const productRouter = express.Router();

productRouter.get("/", GetAllProducts);

productRouter.post("/", CreateProduct);

productRouter.delete("/:product_id", DeleteProduct);

productRouter.put("/:product_id", UpdateProduct);

export default productRouter;
