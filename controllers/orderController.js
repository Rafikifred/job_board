const Order = require("./models/Order");

// GET ALL ORDERS (ADMIN)
exports.getOrders = async (req, res, next) => {
  try {
    res.json(await Order.find().populate("user products.product"));
  } catch (err) {
    next(err);
  }
};

// GET USER ORDERS
exports.getMyOrders = async (req, res, next) => {
  try {
    res.json(await Order.find({ user: req.user.id }));
  } catch (err) {
    next(err);
  }
};

// CREATE ORDER
exports.createOrder = async (req, res, next) => {
  try {
    const { products, total } = req.body;

    if (!products || !total)
      return res.status(400).json({ error: "Invalid order data" });

    const order = await Order.create({
      user: req.user.id,
      products,
      total,
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// UPDATE ORDER STATUS (ADMIN)
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!order)
      return res.status(404).json({ error: "Order not found" });

    res.json(order);
  } catch (err) {
    next(err);
  }
};

// DELETE ORDER (ADMIN)
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order)
      return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order deleted" });
  } catch (err) {
    next(err);
  }
};
