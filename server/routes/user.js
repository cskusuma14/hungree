const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userCtrl");

router.get("/", userController.list);
router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
