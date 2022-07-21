const Joi = require("joi");
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
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
    maxlength: 256,
  },
  averageRating: {
    type: Number,
  },
  reviews: [
    {
      type: new mongoose.Schema({
        comment: {
          type: String,
          minlength: 1,
          maxlength: 150,
        },
        rating: {
          type: Number,
        },
        userId: String,
        userName: String,
      }),
    },
  ],
  cityId: String,
  imgSrc: String,
});

const Location = mongoose.model("Location", locationSchema);

function validateLocation(location) {
  const schema = Joi.object({
    _id: Joi.objectId(),
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    overallRating: Joi.number(),
    reviews: Joi.array().items(validateReview),
    cityId: Joi.string().required(),
    imgSrc: Joi.string(),
  });

  return schema.validate(location);
}

function validateReview(review) {
  const schema = Joi.object({
    comment: Joi.string().min(1).required(),
    rating: Joi.number().min(1).max(5).required(),
    userId: Joi.string().required(),
    userName: Joi.string().required(),
  });

  return schema.validate(review);
}

exports.locationSchema = locationSchema;
exports.Location = Location;
exports.validateLocation = validateLocation;
exports.validateReview = validateReview;
