const { Router } = require("express");
const router = Router();
const product = require("./product");
const category = require("./category");
const user = require("./user");

router.use("/products", product);
router.use("/categories", category);
router.use("/", user);
module.exports = router;
