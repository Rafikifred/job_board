require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const setupSwagger = require("./swagger/swagger");

const authRoutes = require("./routes/auth");
const companyRoutes = require("./routes/companies");
const ordersRoutes = require("./routes/orders");
const productsRoutes = require("./routes/products");

const app = express();

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/companies", require("./routes/companies"));
app.use("/orders", require("./routes/orders"));
app.use("/products", require("./routes/products"));


// Swagger MUST be after routes
setupSwagger(app);

// Health check
app.get("/", (req, res) => {
  res.json({ ok: true, message: "ShopStream API" });
});

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
