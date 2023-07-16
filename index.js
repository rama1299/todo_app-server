require("dotenv").config();
const router = require("./routes/index.js");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler.js");
const port = process.env.PORT;

const express = require("express");
const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
