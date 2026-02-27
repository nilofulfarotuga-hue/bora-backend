require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

app.get("/", (req, res) => {
  res.send("BORA backend running 🚀");
});

app.post("/orders", (req, res) => {
  const order = {
    id: generateId(),
    status: "pending",
    createdAt: new Date(),
  };

  orders.push(order);
  res.json(order);
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.post("/orders/:id/accept", (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).send("Pedido não encontrado");

  order.status = "accepted";
  res.json(order);
});

app.post("/orders/:id/deliver", (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).send("Pedido não encontrado");

  order.status = "delivered";
  res.json(order);
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
