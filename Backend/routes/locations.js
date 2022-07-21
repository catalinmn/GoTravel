const { Location, validateLocation, validateReview } = require("../models/location");
const { City } = require("../models/city");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.get("/:id", async (req, res) => {
  //   const locations = await Location.find({ cityId: { $eq: req.params.id } }).sort("name");
  const cityId = req.params.id.toString();
  const locations = await Location.find({ cityId: cityId }).sort("name");

  res.status(200).send(locations);
});

router.get("/:id/location", async (req, res) => {
  const location = await Location.findOne({ _id: req.params.id });

  res.status(200).send(location);
});

router.get("/:id/reviews", async (req, res) => {
  const location = await Location.findOne({ _id: req.params.id });

  let reviews = [];

  await Promise.all(
    location.reviews.map(async (review) => {
      reviews.push(review);
    })
  );

  res.status(200).send(reviews);
});

// router.get("/:id/rating", async (req, res) => {
//   const location = await Location.findOne({ _id: req.params.id });
//   let ratings = [];

//   location.reviews.map(async (review) => {
//     ratings.push(review.rating);
//   });

//   const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

//   res.status(200).send(avgRating);
// });

router.post("/", async (req, res) => {
  const { error } = validateLocation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let location = await Location.findOne({ name: req.body.name });
  if (location) return res.status(400).send("Location already registered.");

  //location = new Location(req.body);

  let cityLocation = {};

  try {
    let task = new Fawn.Task();

    task.save("locations", req.body);

    await task.run().then(function (results) {
      cityLocation = results.map((result) => result.ops);
    });
  } catch (ex) {
    res.status(500).send("Something failed when saving a location.");
  }

  location = cityLocation[0][0];
  cityLocation = (({ _id, name }) => ({ _id, name }))(location);

  await City.updateOne(
    { _id: req.body.cityId },
    {
      $addToSet: {
        locations: cityLocation,
      },
    }
  );

  res.send(location);
});

router.put("/:id/reviews", async (req, res) => {
  const { error } = validateReview(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await Location.updateOne(
    { _id: req.params.id },
    {
      $push: {
        reviews: req.body,
      },
    }
  );

  let ratings = [];

  const locationReviews = await Location.findOne({ _id: req.params.id }).select("reviews");

  locationReviews.reviews.map(async (review) => {
    ratings.push(review.rating);
  });

  const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

  location = await Location.updateOne(
    { _id: req.params.id },
    {
      averageRating: avgRating,
    }
  );

  res.send(locationReviews);
});

router.delete("/:id/reviews/:reviewId", async (req, res) => {
  await Location.updateOne(
    { _id: req.params.id },
    {
      $pull: {
        reviews: { _id: req.params.reviewId },
      },
    }
  );

  let ratings = [];

  const locationReviews = await Location.findOne({ _id: req.params.id }).select("reviews");

  locationReviews.reviews.map(async (review) => {
    ratings.push(review.rating);
  });

  let avgRating = 0;
  if (ratings.length > 0) avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

  location = await Location.updateOne(
    { _id: req.params.id },
    {
      averageRating: avgRating,
    }
  );

  res.status(200).send(locationReviews);
});

module.exports = router;
