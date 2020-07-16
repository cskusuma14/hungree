const { Router } = require("express");
const router = Router();
const categoryController = require("../controllers/categoryCtrl");

router.get("/", categoryController.list);
router.post("/", categoryController.create);
router.put("/:id", categoryController.edit);
router.delete("/:id", categoryController.delete);

module.exports = router;
