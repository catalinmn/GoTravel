const { Country, validateCountry, validateCountryWithCities } = require("../models/country");
const { City } = require("../models/city");
const _ = require("lodash");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const countries = await Country.find().sort("name");
  res.send(countries);
});

router.get("/:id", async (req, res) => {
  const countries = await Country.findById(req.params.id);

  if (!countries) return res.status(404).send("The countries with the given ID was not found.");

  res.send(countries);
});

router.post("/", async (req, res) => {
  const { error } = validateCountry(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let country = await Country.findOne({ name: req.body.name });
  if (country) return res.status(400).send("Country already registered.");

  country = new Country(_.pick(req.body, ["name"]));

  await country.save();

  res.send(country);
});

router.post("/cities", async (req, res) => {
  const { error } = validateCountryWithCities(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let country = await Country.findOne({ name: req.body.name });
  if (country) return res.status(400).send("Country already registered.");

  let cityNames = req.body.cities.map((result) => result.name);
  let city = await City.find({ name: { $in: cityNames } });

  if (city.length > 0)
    return res.status(400).send(`City ${city.map((result) => result.name)} already registered.`);

  let cities = [];

  try {
    let task = new Fawn.Task();

    req.body.cities.forEach((data) => {
      task = task.save("cities", data);
    });

    await task.run().then(function (results) {
      cities = results.map((result) => result.ops);
    });
  } catch (ex) {
    res.status(500).send("Something failed when saving a city.");
  }

  country = new Country(req.body, cities);
  await country.save();
  res.send(country);
});

module.exports = router;
