require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const companyRoutes = require("./routes/companies");
const orderRoutes = require("./routes/orders");
const setupSwagger = require("./swagger/swagger");
setupSwagger(app);


const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/companies", companyRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "ShopStream API" });
});

module.exports = app;
