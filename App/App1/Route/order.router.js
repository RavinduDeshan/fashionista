
// module.exports = orderRoutes;
"use strict";
const express = require("express");
const orderRoutes = express.Router();
const auth = require('./managerAuth.js');

//required models for this router model
let Product = require("../Models/product.model");

let Order = require("../Models/order.model");

//define add data
orderRoutes.route("/add").post(async (req, res) => {
  let orders = new Order(req.body);

  let products = req.body.products;

  orders
    .save()
    .then((order) => {
      products.map((product) => {
        let p = Product.findOneAndUpdate(
          { productCode: product.productCode },
          {
            ...product,
            quantity:
              parseFloat(product.quantity) - parseFloat(product.buyQuantity),
          }
        );
        return p;
      });
      res.status(200).json({ success: true, data: order });
    })
    .catch((err) => {
      res.status(400).json({ success: false, data: err });
    });
});



//manager get all products
orderRoutes.get("/managerlist",auth,function (req, res) {
  Order.find(function (err, orders) {
      if (err) {
        console.log("Error is: ", err);
      } else {
        res.json(orders);
      }
    });

});


//manager get order by id
orderRoutes.get('/getbyProduct/:id',auth, (req, res) => {

  let id = req.params.id;

  console.log("recieved id is :", id);
  

  Order.find({products: {$elemMatch: {_id:id}}} , function (err, orders) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(orders);
    }
  })
});


orderRoutes.route("/").get(function (req, res) {
  Order.find(function (err, orders) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ success: true, data: orders });
      }
    });

});




orderRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Order.findOne({ orderId: id }, function (err, order) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: order });
    }
  });
});

//Manager recieve products by order date
orderRoutes.get("/byDate/:date",function (req, res) {
  let date = req.params.date;
  Order.find({ orderDate: { $regex: date }}, function (err, order) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: order });
    }
  }).sort({orderDate:-1});;
});








module.exports = orderRoutes;
