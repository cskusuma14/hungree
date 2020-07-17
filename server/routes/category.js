const { Router } = require("express");
const router = Router();
const categoryController = require("../controllers/categoryCtrl");
const authentication = require("../middlewares/authentication");

router.get("/", authentication, categoryController.list);
router.post("/", authentication, categoryController.create);
router.put("/:id", authentication, categoryController.edit);
router.delete("/:id", authentication, categoryController.delete);

module.exports = router;
