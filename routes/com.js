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

recordRoutes.route("/update").post(function (req, res) {
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

module.exports = recordRoutes;
