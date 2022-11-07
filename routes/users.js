var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/**
 * Guards
 **/

async function ensureUserExists(req, res, next) {
  try {
    let results = await db(`SELECT * FROM users WHERE id = ${req.params.id}`);
    if (results.data.length === 1) {
      // User was found; save it in response obj for the route function to use
      res.locals.user = results.data[0];
      // Let next middleware function run
      next();
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

/**
 * Helpers
 **/

async function sendAllUsers(res) {
  // We don't need try/catch here because we're always called from within one
  let results = await db("SELECT * FROM users ORDER BY lastname, firstname");
  res.send(results.data);
}

// Convert DB results into a useful JSON format: user obj with nested array of product objs
function joinToJson(results) {
  // Get first row
  let row0 = results.data[0];

  // Create array of product objs
  let products = [];
  if (row0.product_id) {
    products = results.data.map((p) => ({
      id: p.product_id,
      name: p.name,
      price: p.price,
      img: row0.Img,
      link: row0.Link,
      sales_price: row0.sales_price,
    }));
  }

  // Create user obj
  let user = {
    id: row0.user_id,
    firstname: row0.firstname,
    lastname: row0.lastname,
    email: row0.email,
    password: row0.password,
    products,
  };

  return user;
}

/**
 * Routes
 **/

// GET all users
router.get("/", async function (req, res) {
  try {
    sendAllUsers(res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET user by ID
router.get("/:id", ensureUserExists, async function (req, res) {
  // If we get here we know the user exists (thanks to guard)
  let user = res.locals.user;

  try {
    let sql = `SELECT * FROM users  WHERE id = ${req.params.id}`;

    // Get user; use LEFT JOIN to also return products
    // let sql = `
    //     SELECT a.*, b.*, a.id AS user_id, b.id AS productId
    //     FROM users AS a
    //     LEFT JOIN products_users AS ba ON a.id = ba.user_id
    //     LEFT JOIN products AS b ON ba.productId = b.id
    //     WHERE a.id = ${user.id}
    // `;

    let results = await db(sql);
    // Convert DB results into "sensible" JSON
    // user = joinToJson(results);

    res.send(results.data[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST a new user
router.post("/", async function (req, res) {
  let { firstname, lastname, product_id } = req.body;

  let sql = `
        INSERT INTO users (firstname, lastname)
        VALUES ('${firstname}', '${lastname}');
        SELECT LAST_INSERT_ID();
    `;

  try {
    let results = await db(sql);
    // The results contain the new user's ID thanks to LAST_INSERT_ID()
    let user_id = results.data[0].insertId;

    // Add user/products to junction table
    if (product_id && product_id.length) {
      let vals = [];
      for (let product_id of product_id) {
        vals.push(`(${product_id}, ${user_id})`);
      }
      let sql = `
                INSERT INTO products_users (product_id, user_id)
                VALUES ${vals.join(",")}`;
      await db(sql);
    }

    // Set status code for "resource created" and return all users
    res.status(201);
    sendAllUsers(res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE user by ID
router.delete("/:id", ensureUserExists, async function (req, res) {
  // If we get here we know the user exists (thanks to guard)
  let user = res.locals.user;

  try {
    // Delete user and junction table entries (but not product)
    // (thanks to ON DELETE CASCADE in table definition)
    await db(`DELETE FROM users WHERE id = ${user.id}`);
    sendAllUsers(res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
