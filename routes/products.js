const { request } = require('express');
var express = require('express');
var router = express.Router();
const db = require('../model/helper');

/**
 * Guards
 **/


 async function ensureProductExists(req, res, next) {
  try {
      let results = await db(`SELECT * FROM products WHERE id = ${req.params.id}`);
      if (results.data.length === 1) {
          // Product was found; save it in response obj for the route function to use
          res.locals.products = results.data[0];
          // Let next middleware function run
          next();
      } else {
          res.status(404).send({ error: 'Product not found' });
      }
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
}

/**
 * Helpers
 **/


 async function sendAllProducts(res) {
  // We don't need try/catch here because we're always called from within one
  let results = await db('SELECT * FROM products ORDER BY id');
  res.send(results.data);
}


// Convert the DB results into a useful JSON format:
// A product obj with nested user obj 
function joinToJson(results) {
  let row0 = results.data[0];

  // Create users array
  let users = results.data.map(row => ({
      id: row.user_id,
      firstname: row.firstname,
      lastname: row.lastname,
      email: row.email,
      password: row.password
  }));

  // Create product obj
  let product = {
      id: row0.product_id,
      itemId:row0.itemId,
      name: row0.name,
      price: row0.price,
      img: row0.Img,
      link: row0.Link,
      sales_price: row0.sales_price,
      users
  }

  return product;
}

// GET all product

router.get("/", async (req, res) => {
  try {
    console.log("Hello potato!")
      let results = await db('SELECT * FROM products');
      let product = results.data;  // results.data is an array of DB rows
      res.send(product);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});


// GET product with ID
router.get("/:id", async (req, res) => {
  let product_id = req.params.id;

  try {
      let results = await db(`SELECT * FROM products WHERE id = ${product_id}`);
      let products = results.data;
      if (products.length === 0) {
          // products array is empty... no product found
          res.status(404).send({ error: 'Product not found' });
      } else {
          // products array has one row; return it
          res.send(products[0]);
      }
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});


// POST new product
router.post("/", async (req, res) => {
  let { id, itemId, name, price, img, link, sales_price} = req.body;

  let sql = `
      INSERT INTO products (id, name, price, Img, Link, sales_price)
      VALUES ('${id}', '${itemId}',${name}, ${price}, ${img}, ${link}, ${sales_price})
  `;

  try {
      await db(sql);  // add new product
      let result = await db('SELECT * FROM products');
      let products = result.data;
      res.status(201).send(products);  // return updated array (with 201 for "new resource created")
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});


// PUT modified product
router.put("/update/:id", async (req, res) => {
  let product_id = req.params.id;
  console.log(product_id);
  let { id, itemId, name, price, img, link, sales_price} = req.body;
  console.log(req.body.sales_price);
  try {
      let result = await db(`SELECT * FROM products WHERE id = ${product_id}`);  // does product exist?
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Product not found' });
      } else {
          let sql = `
              UPDATE products 
              SET id = '${id}', itemId = '${itemId}', name = '${name}', price = '${price}', img = '${img}', link = '${link}', sales_price = '${sales_price}'
              WHERE id = ${product_id}
          `;

          await db(sql);  // update product
          let result = await db('SELECT * FROM products');
          let products = result.data;
          res.send(products);  // return updated array
      }
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});


// DELETE product
router.delete("/:id", async (req, res) => {
  let product_id = req.params.id;

  try {
      let result = await db(`SELECT * FROM products WHERE id = ${product_id}`);  // does product exist?
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Product not found' });
      } else {
          await db(`DELETE FROM products WHERE id = ${product_id}`);  // delete product
          let result = await db('SELECT * FROM products');
          let products = result.data;
          res.send(products);  // return updated array
      } 
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

module.exports = router;
