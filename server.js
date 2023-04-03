require("dotenv").config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const dbo = require("./db/conn");

const PORT = process.env.PORT || 5000;
const app = express();
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(require("./routes/fastag"));
app.use(require("./routes/pan"));
app.use(require("./routes/digiserv"));
app.use(require("./routes/com"));

app.use(function (err, _req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
  next();
});

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
