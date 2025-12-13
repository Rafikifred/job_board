const Joi = require("joi");

exports.createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  stock: Joi.number().required(),
  company: Joi.string().required(),
  image: Joi.string()
});

exports.updateProductSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  category: Joi.string(),
  stock: Joi.number(),
  company: Joi.string(),
  image: Joi.string()
});
