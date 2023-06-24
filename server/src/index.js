const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const multer = require("multer");
const cors = require("cors");
const { dbConnection } = require("./database/db");
const userRoutes = require("../src/routes/userRoutes");
const postRoutes = require("../src/routes/postRoutes");
const path = require("path");
const url = process.env.URL;
const port = process.env.PORT || 5000;

app.use(multer().any());
app.use(cors());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));
app.use("/api/accounts", userRoutes);
app.use("/api/post", postRoutes);

dbConnection(url);
app.listen(port, () => {
  console.log(`server start on port ${port}`);
});

app.get("*", (req, res) => {
  const file = path.join(__dirname, "../build/index.html");
  res.sendFile(file);
});
