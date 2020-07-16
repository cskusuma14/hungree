const { Category } = require("../models");
const Redis = require("ioredis");
const redis = new Redis();

class Categories {
  static list(req, res) {
    let dataCategories = "";
    redis.get("categoriesHungree").then(function (result) {
      dataCategories = JSON.parse(result);
      if (dataCategories) {
        console.log("a");
        res.status(200).json(dataCategories);
      } else {
        Category.findAll()
          .then((data) => {
            console.log("b");
            redis.set("categoriesHungree", JSON.stringify(data));
            res.status(200).json(data);
          })
          .catch((err) => {
            res.status(500).json({ message: "Internal Server Error" });
          });
      }
    });
  }

  static create(req, res) {
    Category.create({
      name: req.body.name,
      description: req.body.description,
    })
      .then((data) => {
        res.status(201).json(data);
        let newData = "";
        redis.get("categoriesHungree").then(function (result) {
          if (result) {
            newData = JSON.parse(result);
            newData.push(data);
            //console.log(newData);
            redis.set("categoriesHungree", JSON.stringify(newData));
          }
        });
      })
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          res.status(400).json({
            message: err.errors[0].message,
          });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
  }

  static edit(req, res) {
    let categoryId = req.params.id;
    Category.update(
      {
        name: req.body.name,
        description: req.body.description,
      },
      {
        where: { id: categoryId },
      }
    )
      .then((data) => {
        return Category.findByPk(categoryId);
      })
      .then((dataCategory) => {
        if (dataCategory) {
          let newData;
          redis.get("categoriesHungree").then(function (result) {
            if (result) {
              newData = JSON.parse(result);
              let dataCategories = newData.filter(
                (data) => data.id != req.params.id
              );
              dataCategories.push(dataCategory);
              redis.set("categoriesHungree", JSON.stringify(dataCategories));
            }
          });
          res.status(200).json(dataCategory);
        } else res.status(404).json({ message: "data not found" });
      })
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          res.status(400).json({
            message: err.errors[0].message,
          });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
  }

  static delete(req, res) {
    let categoryId = req.params.id;
    let dataDelete = null;

    Category.findByPk(categoryId)
      .then((dataCategory) => {
        dataDelete = dataCategory;
        return Category.destroy({
          where: { id: categoryId },
        });
      })
      .then((data) => {
        if (data) {
          let newData;
          redis.get("categoriesHungree").then(function (result) {
            if (result) {
              newData = JSON.parse(result);
              let dataCategories = newData.filter(
                (data) => data.id != req.params.id
              );
              //console.log(newData);
              redis.set("categoriesHungree", JSON.stringify(dataCategories));
            }
          });
          res.status(200).json(dataDelete);
        } else res.status(404).json({ message: "data not found" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}
module.exports = Categories;
