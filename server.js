const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");


dotenv.config();

const app = express();
let PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


const authRoutes = require("/Routes/auth.js");
const streakRoutes = require("/Routes/streak.js");

app.use("/auth", authRoutes);
app.use("/streak", streakRoutes); 

app.get("/", (req, res) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    res.set("Surrogate-Control", "no-store");
    res.status(200).send("Sports Streak API is running...");
  });
  


const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.warn(`Port ${PORT} is in use, trying a different port...`);
    PORT = parseInt(PORT) + 1;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } else {
    console.error("Server error:", err);
  }
});
