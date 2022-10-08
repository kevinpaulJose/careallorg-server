const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");

recordRoutes.route("/pan").post(function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pan")
    .count()
    .then((count) => {
      const matchDocument = {
        order_id: `PAN${req.body.a_mobile_no}${count.toString()}`,
        last_modified: new Date(),
        title: req.body.title,
        a_firstName: req.body.a_firstName,
        a_middleName: req.body.a_middleName,
        a_lastName: req.body.a_lastName,
        a_mobile_no: req.body.a_mobile_no,
        dob: req.body.dob,
        email_id: req.body.email_id,
        aadhar_no: req.body.aadhar_no,
        aadhar_name: req.body.aadhar_name,
        f_firstName: req.body.f_firstName,
        f_middleName: req.body.f_middleName,
        f_lastName: req.body.f_lastName,
        m_firstName: req.body.m_firstName,
        m_middleName: req.body.m_middleName,
        m_lastName: req.body.m_lastName,
        aadhar_file: req.body.aadhar_file,
        pan_file: req.body.pan_file,
        address_file: req.body.address_file,
        status: "Pending Payment",
        paid: req.body.paid,
        type: req.body.type,
      };

      dbConnect
        .collection("pan")
        .insertOne(matchDocument, function (err, result) {
          if (err) {
            res.status(400).send("Error inserting matches!");
          } else {
            console.log(`Added a new match with id ${result.insertedId}`);
            res.json({
              order_id: `PAN${req.body.a_mobile_no}${count.toString()}`,
            });
          }
        });
    });
});

module.exports = recordRoutes;
