const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const Document = require("./models/Document");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("src/uploads"));

// Routes
const documentRoutes = require("./routes/document.routes");
app.use("/documents", documentRoutes);

// Sync DB
sequelize.sync().then(() => {
  console.log("Database synced");
});

// Start server
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
