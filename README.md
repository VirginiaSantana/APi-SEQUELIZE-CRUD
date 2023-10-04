## Local Commerce REST API

This is a REST API built with Node.js, utilizing Express Sequelize as an ORM, and tested using Jest and Supertest. It provides essential CRUD operations (GET, POST, PUT, PATCH, DELETE) and can be tested using tools like Postman.
## Flow Diagram

https://dbdiagram.io/d/API-REST-IT-WORD-65115e62ffbf5169f06f3f2f

## Main Features

- Users can perform CRUD (Create, Read, Update, Delete) operations on products in their e-commerce.
- Users can also update product stock levels.
- Products are organized by brand.
- Users can perform CRUD operations on product brands.

## Initial Setup

1. git clone to clone this repository to your local machine
2. nmp install to install all necessary dependencies
3. nmp install express sequelize mysql2
4. npm install -d nodemon 
5. npm install --save -d jest
6. npm install --save -d supertest
7. npm install cors
8. npm run dev to raise the server
9. npm test to start the test

## Technologies Used
- Node.js
- MySQL (Database)
- Sequelize (ORM)
- Jest (Unit Testing)
- Supertest (Endpoint Testing)

## Author

- Virginia Santana - [@VirginiaSantana](https://github.com/VirginiaSantana)

## Testing

To run unit tests:

```bash
  npm run test
```
The API should be running at http://localhost:8000

## Execution

To start this API in development mode:

```bash
  npm start
```
The API should be running at http://localhost:8000
