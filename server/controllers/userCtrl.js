const { User } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class Users {
  static list(req, res) {
    User.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
  }

  static register(req, res) {
    User.findAll({
      where: { email: req.body.email },
    })
      .then((dataUser) => {
        if (dataUser.length === 0) {
          return User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: "Administrator",
          });
        } else {
          res.status(400).json({ message: "email already registered" });
        }
      })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          res.status(400).json({
            message: err.errors[0].message,
          });
        } else {
          res.status(500).json({ message: "internal server error" });
        }
      });
  }

  static login(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((dataUser) => {
        if (!dataUser) {
          res.status(400).json({ message: "email not registered" });
        } else {
          const isPassword = checkPassword(
            req.body.password,
            dataUser.password
          );
          if (!isPassword) {
            res.status(400).json({ message: "incorrect password" });
          } else {
            const token = jwt.sign(
              {
                userId: dataUser.id,
                username: dataUser.username,
                email: dataUser.email,
              },
              process.env.JWT_SECRET
            );
            res.status(201).json({ token });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
      });
  }
}

module.exports = Users;
