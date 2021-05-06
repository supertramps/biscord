const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { pingTimeout: 25000 });
const port = process.env.PORT || 6969;

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  addUserToRoom,
  users,
} = require("./users");

function onConnection(socket) {
  console.log("Client was connected", socket.id);

  socket.on("join-lobby", (name) => {
    const { user, error } = addUser({ id: socket.id, name, room: "Lobby" });
    const loggedInUser = getUser(socket.id);
    socket.join("Lobby", () => {
      console.log("test");
      io.to(socked.id).emit("joined-succ", "joined");
      io.to("Lobby").to("joined", `joined the room!`);
      io.emit("rooms updated", getRooms());
    });
    getRooms();
    socket.emit("user-session", loggedInUser);
  });

  socket.on("create-room", (msg) => {
    const user = addUserToRoom(
      msg.userInfo.id,
      msg.roomInfo.roomName,
      msg.roomInfo.password
    );
    socket.leave("Lobby");
    socket.join(msg.roomInfo.roomName);
    io.emit("room-session", getRooms());
    const rooms = getRooms();
    console.log(rooms, "lolololo");
  });
  io.emit("room-session", getRooms());

  socket.on("join", (user) => {
    console.log(user);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
}

io.on("connection", onConnection);

function getRooms() {
  let rooms = [];
  const socketsRooms = io.sockets.adapter.rooms;

  for (const socket of socketsRooms) {
    const actualRooms = socket.filter((key) => key === socket[0]);
    console.log(actualRooms[0], "actual rooms");

    if (actualRooms[0].length < 19) {
      rooms.push(actualRooms[0]);
    }
  }
  console.log(rooms, "fuuuuuck");
  return [...new Set(rooms)];
}

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
