require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger/swagger");
require("./config/passport");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err.message));

app.use(passport.initialize());

app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/companies", require("./routes/companies"));
app.use("/orders", require("./routes/orders"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ ok: true, message: "ShopStream API" });
});

app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
