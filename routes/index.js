var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ message: "Welcome to AmazingPriceServer 1.0!" });
});

// router.get("/members-only", ensureUserLoggedIn, function (req, res) {
//   res.send({ message: "Here is your Members Only content from the server..." });
// });

module.exports = router;
