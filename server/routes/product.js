const { Router } = require("express");
const router = Router();
const productController = require("../controllers/productCtrl");
const authentication = require("../middlewares/authentication");

router.get("/", authentication, productController.list);
router.post("/", authentication, productController.create);
router.put("/:id", authentication, productController.edit);
router.delete("/:id", authentication, productController.delete);

module.exports = router;
