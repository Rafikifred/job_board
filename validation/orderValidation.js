const Joi = require("joi");

const orderSchema = Joi.object({
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).required()
    })
  ).required(),
  totalPrice: Joi.number().positive().required(),
  status: Joi.string().valid("pending", "shipped", "delivered")
});

module.exports = orderSchema;
