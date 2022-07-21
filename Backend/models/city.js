const Joi = require("joi");
const mongoose = require("mongoose");
const { validateLocation } = require("./location");

const locationSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Location",
  },
  name: String,
});

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    index: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 999,
  },
  locations: [locationSchema],
  imgSrc: String,
  // users: [
  //   {
  //     type: mongoose.Schema.Types.ObjectID,
  //     ref: "User",
  //   },
  // ],
});

const City = mongoose.model("City", citySchema);

function validateCity(city) {
  const schema = Joi.object({
    _id: Joi.objectId(),
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    locations: Joi.array().items(validateLocation),
    imgSrc: Joi.string(),
    //users: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(city);
}

exports.citySchema = citySchema;
exports.City = City;
exports.validateCity = validateCity;
