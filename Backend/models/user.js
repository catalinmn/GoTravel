const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Location",
  },
  name: String,
});

const citySchema = new mongoose.Schema({
  city: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "City",
  },
  name: String,
});

const countrySchema = new mongoose.Schema({
  country: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Country",
  },
  name: String,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
  countries: [countrySchema],
  cities: [citySchema],
  locations: [locationSchema],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
}

function validateLocation(location) {
  const schema = Joi.object({
    _id: Joi.objectId(),
    name: Joi.string().min(1),
  });

  return schema.validate(location);
}

function validateCity(city) {
  const schema = Joi.object({
    _id: Joi.objectId(),
    name: Joi.string().min(1),
  });

  return schema.validate(city);
}

function validateCountry(country) {
  const schema = Joi.object({
    _id: Joi.objectId(),
    name: Joi.string().min(1),
  });

  return schema.validate(country);
}

exports.User = User;
exports.validate = validateUser;
exports.validateCountry = validateCountry;
exports.validateCity = validateCountry;
exports.validateLocation = validateCountry;
