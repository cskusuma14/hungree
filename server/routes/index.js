const { Router } = require("express");
const router = Router();
const product = require("./product");
const category = require("./category");

router.use("/products", product);
router.use("/categories", category);
module.exports = router;
