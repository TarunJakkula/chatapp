const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("Connected" + socket.id);
  io.emit("numOfUsers", io.sockets.sockets.size - 1);
  socket.on("sendMessage", (msg) => {
    socket.broadcast.emit("stream", msg);
  });
  socket.on("disconnect", () => {
    console.log("Disconnected " + socket.id);
    io.emit("numOfUsers", io.sockets.sockets.size - 1);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3001);
