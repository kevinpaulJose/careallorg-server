const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");

recordRoutes.route("/fastag").post(function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("fastag")
    .count()
    .then((count) => {
      const matchDocument = {
        order_id: `FAS${req.body.mobile_no}${count.toString()}`,
        last_modified: new Date(),
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile_no: req.body.mobile_no,
        email_id: req.body.email_id,
        vehicle_class: req.body.vehicle_class,
        vehicle_no: req.body.vehicle_no,
        chassis_no: req.body.chassis_no,
        engine_no: req.body.engine_no,
        rto_location: req.body.rto_location,
        aadhar_file: req.body.aadhar_file,
        pan_file: req.body.pan_file,
        reg_cert_file: req.body.reg_cert_file,
        status: "Pending Payment",
        paid: req.body.paid,
        type: req.body.type,
      };

      dbConnect
        .collection("fastag")
        .insertOne(matchDocument, function (err, result) {
          if (err) {
            res.status(400).send("Error inserting matches!");
          } else {
            console.log(`Added a new match with id ${result.insertedId}`);
            res.json({
              order_id: `FAS${req.body.mobile_no}${count.toString()}`,
            });
          }
        });
    });
});

module.exports = recordRoutes;
