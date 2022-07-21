const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const { City, validateCity } = require("../models/city");
const { Country } = require("../models/country");
const { Location, validateLocation } = require("../models/location");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("name");
  res.send(user);
});

// router.get("/:id", async (req, res) => {
//   const user = await User.findById(req.params.id).select("-password");
//   res.send(user);
// });

router.get("/countries/:id", auth, async (req, res) => {
  const countries = await User.findById(req.params.id).select("countries");
  res.send(countries);
});

router.get("/cities/:id", auth, async (req, res) => {
  const cities = await User.findById(req.params.id).select("cities");
  res.send(cities);
});

router.get("/locations/:id", auth, async (req, res) => {
  const locations = await User.findById(req.params.id).select("locations");
  res.send(locations);
});

router.get("/wishlist/:id", async (req, res) => {
  const wishlist = await User.findById(req.params.id).select({
    countries: 1,
    cities: 1,
    locations: 1,
  });
  let tempWishlist = {};
  let i = 0;

  if (wishlist.countries.lenght === 0) res.send(tempWishlist);

  for (let country of wishlist.countries) {
    let j = 0;
    const allCities = await Country.findOne({ _id: country._id }).select("cities");
    _.set(tempWishlist, `tempWishlist[${i}].name`, country.name);
    for (let likedCity of wishlist.cities) {
      await Promise.all(
        allCities.cities.map(async (city) => {
          if (city._id.toString() === likedCity._id.toString()) {
            let { _doc: liked } = { ...city };
            let k = 0;
            for (let likedLocation of wishlist.locations) {
              const location = await Location.findById({ _id: likedLocation._id }).select({
                name: 1,
                cityId: 1,
              });

              if (city._id.toString() === location.cityId.toString()) {
                _.set(liked, `locations[${k}]`, likedLocation);

                k++;
              }
            }
            _.set(tempWishlist, `tempWishlist[${i}].cities[${j}]`, liked);
            j++;
          }
        })
      );
    }
    i++;
  }

  tempWishlist = tempWishlist.tempWishlist;

  res.send(tempWishlist);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));
});

router.put("/locations/:id", auth, async (req, res) => {
  const { error } = validateLocation(req.body.location);
  if (error) return res.status(400).send(error.details[0].message);

  req.body = (({ _id, name }) => ({ _id, name }))(req.body);

  const likedLocation = await User.findOne({
    _id: req.params.id,
    "locations._id": req.body._id,
  });

  if (!likedLocation) {
    const city = await City.findOne({
      "locations._id": req.body._id,
    });

    const likedCity = await User.findOne({
      _id: req.params.id,
      "cities._id": city._id,
    });

    if (!likedCity) {
      const country = await Country.findOne({
        "cities._id": city._id,
      });

      const likedCountry = await User.findOne({
        _id: req.params.id,
        "countries._id": country._id,
      });

      if (!likedCountry) {
        await User.updateOne(
          { _id: req.params.id },
          {
            $addToSet: {
              countries: country,
              cities: city,
              locations: req.body,
            },
          }
        );
      } else {
        await User.updateOne(
          { _id: req.params.id },
          {
            $addToSet: {
              cities: city,
              locations: req.body,
            },
          }
        );
      }
    } else {
      await User.updateOne(
        { _id: req.params.id },
        {
          $addToSet: {
            locations: req.body,
          },
        }
      );
    }
  } else {
    await User.updateOne(
      { _id: req.params.id },
      {
        $pull: {
          locations: req.body,
        },
      }
    );
  }

  const user = await User.findById(req.params.id);
  res.status(200).send(user);
});

router.put("/cities/:id", auth, async (req, res) => {
  const { error } = validateCity(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  req.body = (({ _id, name }) => ({ _id, name }))(req.body);

  const likedCity = await User.findOne({
    _id: req.params.id,
    "cities._id": req.body._id,
  });

  if (!likedCity) {
    const country = await Country.findOne({
      "cities._id": req.body._id,
    }).select("_id, name");

    let likedCountry = await User.findOne({
      _id: req.params.id,
      "countries._id": country._id,
    }).select("country");

    if (!likedCountry) {
      await User.updateOne(
        { _id: req.params.id },
        {
          $addToSet: {
            countries: country,
            cities: req.body,
          },
        }
      );
    } else {
      await User.updateOne(
        { _id: req.params.id },
        {
          $addToSet: {
            cities: req.body,
          },
        }
      );
    }
  } else {
    const city = await City.findOne({ _id: req.body._id }).select("locations");

    const locationIDs = [];
    city.locations.map((location) => locationIDs.push(location._id));

    await User.updateOne(
      { _id: req.params.id },
      {
        $pull: {
          cities: req.body,
          locations: { _id: { $in: locationIDs } },
        },
      },
      { multi: true }
    );

    // await User.updateOne(
    //   { _id: req.params.id },

    //   {
    //     $pull: {
    //       locations: { _id: { $in: locationIDs } },
    //     },
    //   },
    //   { multi: true }
    // );

    const remainingLikedCities = await User.findOne({
      _id: req.params.id,
    }).select("cities._id");

    if (_.isEmpty(remainingLikedCities.cities)) {
      const country = await Country.findOne({
        "cities._id": req.body._id,
      }).select("_id, name");

      await User.updateOne(
        { _id: req.params.id },
        {
          $pull: {
            countries: country,
          },
        }
      );
    }
  }

  const user = await User.findById(req.params.id);
  res.status(200).send(user);
});

module.exports = router;
