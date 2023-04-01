const express = require("express");

const cors = require("cors");
const morgan = require("morgan");
const userRoute = require("./routes/userRoute.js");
const adminRoute = require("./routes/adminRoute.js");

const app = express();

app.use(cors());
app.use(express.json());

// middleware setup the logger with custom token formats
app.use(morgan("dev"));

app.use("/api/v1", userRoute);
app.use("/api/v1", adminRoute);

app.get("/signuptests", (req, res) => {
  res.render("signupTest");
});

module.exports = app;
