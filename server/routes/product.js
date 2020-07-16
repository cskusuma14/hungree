const { Router } = require("express");
const router = Router();
const productController = require("../controllers/productCtrl");

router.get("/", productController.list);
router.post("/", productController.create);
router.put("/:id", productController.edit);
router.delete("/:id", productController.delete);

module.exports = router;
