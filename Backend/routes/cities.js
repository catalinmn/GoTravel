const { City, validateCity } = require("../models/city");
const { Country } = require("../models/country");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const cities = await City.find().sort("name");
  res.send(cities);
});

router.get("/:id", async (req, res) => {
  const cities = await City.findById(req.params.id);

  if (!cities) return res.status(404).send("The cities with the given ID was not found.");

  res.send(cities);
});

router.get("/country/:id", async (req, res) => {
  const country = await Country.findById(req.params.id);

  if (!country) return res.status(404).send("The country with the given ID was not found.");

  const citiesId = country.cities.map((city) => city._id);

  const cities = await City.find({ _id: { $in: citiesId } }).sort("name");

  if (!cities) return res.status(404).send("No city registered for that country");

  res.send(cities);
});

router.post("/", async (req, res) => {
  const { error } = validateCity(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let city = await City.findOne({ name: req.body.name });
  if (city) return res.status(400).send("City already registered.");

  city = new City(req.body);

  await city.save();

  res.send(city);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCity(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const city = await City.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.name,
      description: req.body.description,
    },
    { new: true }
  );

  if (!city) return res.status(404).send("The city with the given ID was not found.");

  res.send(city);
});

module.exports = router;
