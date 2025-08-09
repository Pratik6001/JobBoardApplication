const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const connectToDB = require("./config/db.config");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobroutes");

// Connect to DB before starting the server
connectToDB();

// Body parsing
app.use(express.json());

// Cors setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Job Routes
app.use("/auth", authRoutes);
app.use("/", jobRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
