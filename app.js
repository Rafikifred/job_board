const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const companyRoutes = require("./routes/companies");
const orderRoutes = require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Job Board API" });
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/companies", companyRoutes);
app.use("/orders", orderRoutes);

module.exports = app;
