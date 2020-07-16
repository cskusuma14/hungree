const { Product } = require("../models");
const Redis = require("ioredis");
const redis = new Redis();

class Products {
  static list(req, res) {
    let dataProducts = "";
    redis.get("productsHungree").then(function (result) {
      dataProducts = JSON.parse(result);
      if (dataProducts) {
        res.status(200).json(dataProducts);
      } else {
        Product.findAll()
          .then((data) => {
            redis.set("productsHungree", JSON.stringify(data));
            res.status(200).json(data);
          })
          .catch((err) => {
            res.status(500).json({ message: "Internal Server Error" });
          });
      }
    });
  }

  static create(req, res) {
    Product.create({
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      description: req.body.description,
    })
      .then((data) => {
        res.status(201).json(data);
        let newData = "";
        redis.get("productsHungree").then(function (result) {
          if (result) {
            newData = JSON.parse(result);
            newData.push(data);
            //console.log(newData);
            redis.set("productsHungree", JSON.stringify(newData));
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
    let productId = req.params.id;
    Product.update(
      {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
        description: req.body.description,
      },
      {
        where: { id: productId },
      }
    )
      .then((data) => {
        return Product.findByPk(productId);
      })
      .then((dataProduct) => {
        if (dataProduct) {
          let newData;
          redis.get("productsHungree").then(function (result) {
            if (result) {
              newData = JSON.parse(result);
              let dataProducts = newData.filter(
                (data) => data.id != req.params.id
              );
              dataProducts.push(dataProduct);
              redis.set("productsHungree", JSON.stringify(dataProducts));
            }
          });
          res.status(200).json(dataProduct);
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
    let productId = req.params.id;
    let dataDelete = null;

    Product.findByPk(productId)
      .then((dataProduct) => {
        dataDelete = dataProduct;
        return Product.destroy({
          where: { id: productId },
        });
      })
      .then((data) => {
        if (data) {
          let newData;
          redis.get("productsHungree").then(function (result) {
            if (result) {
              newData = JSON.parse(result);
              let dataProducts = newData.filter(
                (data) => data.id != req.params.id
              );
              //console.log(newData);
              redis.set("productsHungree", JSON.stringify(dataProducts));
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

module.exports = Products;
