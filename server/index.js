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
  createRoom,
  switchRoom,
  users,
} = require("./users");

function onConnection(socket) {
  console.log("Client was connected", socket.id);

  socket.on("join-lobby", (name) => {
    const { user, error } = addUser({ id: socket.id, name, room: "Lobby" });
    const loggedInUser = getUser(socket.id);
    socket.join("Lobby");
    io.to(socket.id).emit("joined-successfully", "joined");
    io.to('Lobby').emit("joined", `${loggedInUser.name} joined the #Lobby`);
    io.emit("room-session", getRooms());
    socket.emit("user-session", loggedInUser);
  });

  socket.on("create-room", (data) => {
    const userSession = getUser(socket.id);
    socket.leave(userSession.room);
    io.to(userSession.room).emit("left", `${userSession.name} left the room`);
    const user = createRoom(
      data.userInfo.id,
      data.roomInfo.roomName,
      data.roomInfo.password
    );
    socket.join(data.roomInfo.roomName);
    io.to(data.room).emit("joined", `${userSession.name} joined ${data.room}`);
    io.emit("room-session", getRooms());
    socket.emit("current-room", userSession);
    console.log(io.sockets.adapter.rooms)
  });


  socket.on("chat-message", (msg) => {
    const loggedInUser = getUser(socket.id);
    console.log(loggedInUser.room);
    console.log(msg);
    io.to(loggedInUser.room).emit("chat-message", { msg, loggedInUser });
  });

  socket.on('switch-room', (data) => {
      const userSession = getUser(socket.id);
      socket.leave(userSession.room)
      io.to(userSession.room).emit("left", `${userSession.name} left the room`);
      const user = switchRoom(
        socket.id,
        data.room,
      );
      socket.join(data.room)  
      io.to(data.room).emit("joined", `${userSession.name} joined ${data.room}`);
      socket.emit("current-room", userSession);
      io.emit("room-session", getRooms()); 
      console.log(io.sockets.adapter.rooms)
  })

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
    if (actualRooms[0].length < 19) {
      rooms.push(actualRooms[0]);
    }
  }
  return [...new Set(rooms)];
}

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
