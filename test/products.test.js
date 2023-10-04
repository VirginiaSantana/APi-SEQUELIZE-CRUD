//Se debedía hacer TDD (hacer el test antes del código)
import request from "supertest"; //Este test solo funciona con supertest
import { app, server } from "../app.js"; //Las constantes app y server vienen del archivo app.js 
import db from "../database/db.js";

describe("Test CRUD Products", () => { //Espera que coja toda la base de datos.
  /*beforeAll(async () => { //"beforeAll" y "afterAll" son funciones de Jest.
    await db.sync(); 
  });*/

  afterAll(() => { //Después de coger la base de datos, cierra el servidor.
    db.close(); 
    server.close(); 
  });

  describe("GET /products", () => { //Dos test del método GET -> Trae la información de los productos ya creados en la base de datos.
    let response;

    beforeAll(async () => { 
      response = await request(app).get("/products").send();
    });

    test("should return a response with status 200 and type json", () => {
      expect(response.status).toBe(200); // "expect" y "toBe" no son métodos de Jest.
      expect(response.headers["content-type"]).toContain("json"); //Le pide que convierta los datos del header en json.
    });

    test("should return an array of products", () => { //Le pide que convierta los datos en un array para poder acceder a los datos por su posición numérica.
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /products", () => { //Dos test del método POST -> crea un nuevo producto.
    const validProduct = { //Introduce los datos del nuevo producto válido en formato json.
      product_name: "Ipad",
      stock_unit: 2,
      product_description: "Ipad xxxxx",
      price: 299.99,
      brand_id: 1,
    };
//Pide que cree el producto y facilite es status 200 = "éxito".
    test("should create a new product and return status 200", async () => {
      const postResponse = await request(app).post("/products").send(validProduct);
      expect(postResponse.status).toBe(200);
      expect(postResponse.headers["content-type"]).toContain("json");
      expect(postResponse.body.message).toContain("The product has been created successfully!");
    });
//Pide facilite un error si el producto no es válido.
      const invalidProduct = {
      product_name: "ADIDAS",
      stock_unit: "No es un número", // Esto podría ser una cadena en lugar de un número
      product_description: "Descripción del producto inválido",
      price: "Precio incorrecto", // Esto podría ser una cadena en lugar de un número
      brand_id: 0, // Un ID que no existe o no cumple con tus validaciones
    };
    test("should return an error if posting an invalid product", async () => {
      const postResponse = await request(app).post("/products").send(invalidProduct);
      expect(postResponse.status).toBe(500);
      expect(postResponse.body.message).toContain("Invalid product data");
    });
  });

  describe("DELETE /products/:id", () => { //Dos test del método DELETE -> Borra un producto ya creado.
    let createdProductId;

    beforeAll(async () => {
      const newProduct = {
      product_name: "Iphone",
      stock_unit: 5,
      product_description: "Iphone xxxxx",
      price: 199.99,
      brand_id: 1,
      };

      const response = await request(app).post("/products/").send(newProduct);
      createdProductId = response.body.id;
    });

    afterAll(async () => {
      await request(app).delete(`/products/${createdProductId}`);
    });

    test("should delete a product and return status 200", async () => {
      const response = await request(app).delete(`/products/${0}`); //Aquí hay que poner el id del producto que queremos borrar.
      expect(response.status).toBe(200);
      expect(response.body.message).toContain("Product deleted successfully");
    });
//Pide que devuelva un error si se intenta borrar un producto con un id que no existe. 
    test("should return an error if trying to delete a non-existent product", async () => {
      const nonExistenProductId = 99999; 
      const response = await request(app).delete(`/products/${nonExistentProductId}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toContain("Product not found");
    });
  });
});

describe("PUT /products/:id", () => { //Tres test del método PUT -> Editar un producto ya creado.
  let createdProductId;

  beforeAll(async () => {
    const newProduct = {
      product_name: "updateProduct",
      stock_unit: 5,
      product_description: "Updating a product",
      price: 0,
      brand_id: 1,
    };

    const response = await request(app).post("/products").send(newProduct);
    createdProductId = response.body.id;

    console.log("Created Product ID:", createdProductId);
  });

  afterAll(async () => {
    await request(app).delete(`/products/${createdProductId}`);
  });

  describe("Updating an existing product", () => { // Este test no pasa
    test("should return status 200 and success message", async () => {
      const updatedProduct = {
      product_name: "Product updated",
      stock_unit: 5,
      product_description: "This product has been updated",
      price: 0.99,
      brand_id: 1,
      };

      const response = await request(app)
        .put(`/products/${createdProductId}`)
        .send(updatedProduct);

      expect(response.status).toBe(200);
      expect(response.body.message).toContain("Product updated successfully");
    });
  });

  describe("Updating a non-existent product", () => { // Este test no pasa
    test("should return status 404 and error message", async () => {
      const nonExistentProductId = 10000000;
      const updatedProduct = {
        title: "Update a Product",
        description: "An updated test product",
        category_id: 1,
      };

      const response = await request(app)
        .put(`/products/${nonExistentProductId}`)
        .send(updatedProduct);

      expect(response.status).toBe(404);
      expect(response.body.message).toContain("Product not found");
    });
  });

  describe("Updating with invalid data", () => {
    test("should return status 400 and error message", async () => {
      const invalidProductData = { 
      product_name: "Updated product",
      stock_unit: 3,
      product_description: "Product xxxxx",
      price: 199.99,
      brand_id:-1, //Hay que ponerlo mal para que el test funcione. 
      };

      const response = await request(app)
        .put(`/products/${createdProductId}`)
        .send(invalidProductData);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Invalid product data");
    });
  });
});

