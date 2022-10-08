const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");

recordRoutes.route("/digiserv").post(function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("digiserv")
    .count()
    .then((count) => {
      const matchDocument = {
        order_id: `DIGISERV${req.body.mobile_no}${count.toString()}`,
        last_modified: new Date(),
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email_id: req.body.email_id,
        aadhar_file: req.body.aadhar_file,
        pan_file: req.body.pan_file,
        photo_file: req.body.photo_file,
        status: "Pending Payment",
        paid: req.body.paid,
        dsc_class: req.body.dsc_class,
        type: req.body.type,
        mobile_no: req.body.mobile_no,
      };

      dbConnect
        .collection("digiserv")
        .insertOne(matchDocument, function (err, result) {
          if (err) {
            res.status(400).send("Error inserting matches!");
          } else {
            console.log(`Added a new match with id ${result.insertedId}`);
            res.json({
              order_id: `DIGISERV${req.body.mobile_no}${count.toString()}`,
            });
          }
        });
    });
});

module.exports = recordRoutes;
