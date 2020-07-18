const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  try {
    //console.log(req.headers)
    const token = req.headers.token;
    if (!token) {
      res.status(400).json({ message: "Token not found" });
    } else {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //console.log(decode);
      req.userId = decode.userId;
      req.username = decode.username;
      req.email = decode.email;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = authentication;
