const Joi = require("joi");
const mongoose = require("mongoose");
const { citySchema, validateCity } = require("./city");

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
    index: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 999,
  },
  imgSrc: String,

  cities: [
    {
      type: new mongoose.Schema({
        name: {
          type: String,
          minlength: 1,
          maxlength: 50,
        },
      }),
      ref: "City",
    },
  ],
});

const Country = mongoose.model("Country", countrySchema);

function validateCountry(country) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    imgSrc: Joi.string(),
    //cities: Joi.array().items(validateCity),
  });

  return schema.validate(country);
}

function validateCountryWithCities(country) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    imgSrc: Joi.string(),
    cities: Joi.array().items(validateCity),
  });

  return schema.validate(country);
}

exports.Country = Country;
exports.countrySchema = countrySchema;
exports.validateCountry = validateCountry;
exports.validateCountryWithCities = validateCountryWithCities;
