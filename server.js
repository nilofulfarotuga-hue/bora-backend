require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BORA backend running 🚀");
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
