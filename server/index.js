const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { pingTimeout: 25000 });
const port = process.env.PORT || 6969;

const { messages, handleMessages } = require("./messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  createRoom,
  switchRoom,
  users,
} = require("./users");

const { rooms, createNewRoom, removeRoom } = require("./rooms");

function onConnection(socket) {
  console.log("Client was connected", socket.id);

  socket.on("join-lobby", (name) => {
    const { user, error } = addUser({ id: socket.id, name, room: "Lobby" });
    const loggedInUser = getUser(socket.id);
    if (loggedInUser) {
      socket.join("Lobby");
      io.to(socket.id).emit("joined-successfully", "joined");
      io.to("Lobby").emit("joined", `${loggedInUser.name} joined the #Lobby`);
      io.emit("room-session", rooms);
      socket.emit("user-session", loggedInUser);
      socket.emit("current-room", loggedInUser);
    }
  });

  socket.on("create-room", (data) => {
    const { roomInfo, userInfo } = data;
    const userSession = getUser(socket.id);
    socket.leave(userSession.room);
    io.to(userSession.room).emit("left", `${userSession.name} left the room`);
    const user = createRoom(socket.id, roomInfo.roomName, roomInfo.password);
    const newRoom = createNewRoom(roomInfo.roomName, roomInfo.password);
    socket.join(roomInfo.roomName);
    io.to(roomInfo.roomName).emit(
      "joined",
      `${userSession.name} joined ${roomInfo.roomName}`
    );
    io.emit("room-session", rooms);
    socket.emit("current-room", userSession);
  });

  socket.on("chat-message", (msg) => {
    const userSession = getUser(socket.id);
    handleMessages(msg, userSession.name, userSession.room, "now");

    const messagesInCurrentRoom = messages.filter(m => m.room === userSession.room);

    io.to(userSession.room).emit("chat-message", { messagesInCurrentRoom, loggedInUser: userSession });
  });

  socket.on("switch-room", (data) => {
    const { userSwitch, room } = data;
    const userSession = getUser(socket.id);

    if (userSession.room !== room.roomName) {
      socket.leave(userSession.room);
      io.to(userSession.room).emit("left", `${userSession.name} left the room`);
      const user = switchRoom(socket.id, room.roomName);
      const checkRoomsOnSocket = getRooms();
      // const remove = removeRoom(checkRoomsOnSocket);
      socket.join(room);
      io.to(room).emit(
        "joined",
        `${userSession.name} joined ${room.roomName}`
      );
      socket.emit("current-room", userSession);
      io.emit("room-session", rooms);
    }
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
    //use [value, key] iteration ?
    const actualRooms = socket.filter((key) => key === socket[0]);
    if (actualRooms[0].length < 19) {
      rooms.push({ room: actualRooms[0] });
    }
  }
  return [...new Set(rooms)];
}

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
