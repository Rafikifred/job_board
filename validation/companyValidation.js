const Joi = require("joi");

const companySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  country: Joi.string().required()
});

module.exports = companySchema;
