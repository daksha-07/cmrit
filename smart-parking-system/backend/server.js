const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

let parkingSlots = {
  twoWheeler: Array(5).fill(false),
  fourWheeler: Array(5).fill(false),
  ev: Array(3).fill(false)
};

let totalVehiclesToday = 0;

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.emit("update", { parkingSlots, totalVehiclesToday });

  socket.on("toggleSlot", ({ category, index }) => {
    parkingSlots[category][index] = !parkingSlots[category][index];
    if (parkingSlots[category][index]) totalVehiclesToday++;

    io.emit("update", { parkingSlots, totalVehiclesToday });
  });
});

server.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
