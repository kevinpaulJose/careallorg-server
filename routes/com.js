const { default: axios } = require("axios");
const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");

recordRoutes.route("/fetch").post(async function (req, res) {
  const dbConnect = dbo.getDb();

  if (req.body.status == "all") {
    dbConnect
      .collection(req.body.item)
      .find({})
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          res.json(result);
        }
      });
  } else {
    dbConnect
      .collection(req.body.item)
      .find({ status: req.body.status })
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          res.json(result);
        }
      });
  }
});

recordRoutes.route("/amount").get(async function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("amount")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

recordRoutes.route("/fetch/id").post(async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection(req.body.item)
    .find({ order_id: req.body.order_id })
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
  // }
});

recordRoutes.route("/update/status").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const listingQuery = { order_id: req.body.order_id };
  const updates = {
    $set: {
      status: req.body.status,
      last_modified: new Date(),
    },
  };

  dbConnect
    .collection(req.body.item)
    .updateOne(listingQuery, updates, function (err, _result) {
      if (err) {
        console.log("err");
        res
          .status(400)
          .send(`Error updating likes on listing with id ${listingQuery.id}!`);
      } else {
        res.status(204).send();
        console.log("1 document updated");
      }
    });
});

recordRoutes.route("/update/paid").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const listingQuery = { order_id: req.body.order_id };
  const updates = {
    $set: {
      paid: req.body.paid,
      last_modified: new Date(),
    },
  };

  dbConnect
    .collection(req.body.item)
    .updateOne(listingQuery, updates, function (err, _result) {
      if (err) {
        console.log("err");
        res
          .status(400)
          .send(`Error updating likes on listing with id ${listingQuery.id}!`);
      } else {
        res.status(204).send();
        console.log("1 document updated");
      }
    });
});

recordRoutes.route("/orders").post(function (req, res) {
  const options = {
    method: "POST",
    url: `https://sandbox.cashfree.com/pg/orders`,
    headers: {
      accept: "application/json",
      "x-client-id": "1550489955ab3658f9dd8a4a0c840551",
      "x-client-secret": "1a09c1121b442ce47a4e4640d5a8ed6638b1bfd3",
      "x-api-version": "2022-01-01",
      "content-type": "application/json",
    },
    data: {
      customer_details: {
        customer_id: req.body.order_id,
        customer_email: req.body.email,
        customer_phone: req.body.phone,
      },
      order_meta: {
        return_url: `https://careall.co.in/orders/{order_id}/{order_token}`,
      },
      order_id: req.body.order_id,
      order_amount: req.body.amount,
      order_currency: "INR",
    },
  };
  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

recordRoutes.route("/orders/status").post(function (req, res) {
  const options = {
    method: "GET",
    url: `https://sandbox.cashfree.com/pg/orders/${req.body.order_id}`,
    headers: {
      accept: "application/json",
      "x-client-id": "1550489955ab3658f9dd8a4a0c840551",
      "x-client-secret": "1a09c1121b442ce47a4e4640d5a8ed6638b1bfd3",
      "x-api-version": "2022-01-01",
    },
  };
  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

module.exports = recordRoutes;
