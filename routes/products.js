const router = require("express").Router();
const ErrorHandler = require("../errors/ErrorHandler");
let products = require("../productData"); // using let here because we need to reassign products variable multiple times.
const apiKeyMiddleware = require("../middlewares/apiKey"); // .. means ek folder bahar jana
router.get("/products", (req, res) => {
  res.render("products", {
    title: "My Product Page",
  });
});

router.get("/api/products", (req, res) => {
  res.json(products);
});

router.post("/api/products", apiKeyMiddleware, (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    next(ErrorHandler.validationError("Name and price fields are required"));
  }

  const product = {
    name,
    price,
    id: new Date().getTime().toString(),
  };

  products.push(product);

  res.json(product);
});

router.delete("/api/products/:productId", (req, res) => {
  products = products.filter((product) => req.params.productId !== product.id); // deleting something from array by reassigning the values to array products.
  res.json({ status: "OK" });
});

module.exports = router;
