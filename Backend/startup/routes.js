const express = require("express");
const locations = require("../routes/locations");
const cities = require("../routes/cities");
const countries = require("../routes/countries");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/locations", locations);
  app.use("/api/cities", cities);
  app.use("/api/countries", countries);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
