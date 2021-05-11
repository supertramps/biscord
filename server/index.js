const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { pingTimeout: 25000 });
const port = process.env.PORT || 6969;

const { messages, handleMessages, filterMessages } = require("./messages");
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
    const userSession = getUser(socket.id);
    if (userSession) {
      socket.join("Lobby");
      io.to(socket.id).emit("joined-successfully", "joined");
      io.to("Lobby").emit("joined", `${userSession.name} joined the #Lobby`);
      const checkRoomsOnSocket = getRooms();
      const remove = removeRoom(checkRoomsOnSocket);
      io.emit("room-session", remove);

      socket.emit("user-session", userSession);
      socket.emit("current-room", userSession.room);
      getMessages(userSession.room, socket);
    }
  });

  socket.on("create-room", (data) => {
    console.log(data);
    const { roomInfo, userInfo } = data;
    const userSession = getUser(socket.id);
    socket.leave(userSession.room);
    io.to(userSession.room).emit("left", `${userSession.name} left the room`);
    const user = createRoom(socket.id, roomInfo.roomName, roomInfo.password);
    const newRoom = createNewRoom(roomInfo.roomName, roomInfo.password);
    socket.join(roomInfo.roomName);
    const checkRoomsOnSocket = getRooms();
    const remove = removeRoom(checkRoomsOnSocket);
    io.to(roomInfo.roomName).emit(
      "joined",
      `${userSession.name} joined ${roomInfo.roomName}`
    );
    io.emit("room-session", remove);
    socket.emit("current-room", roomInfo.roomName);
    getMessages(userSession.room, socket);
  });

  socket.on("chat-message", async (msg) => {
    const userSession = getUser(socket.id);

    await handleMessages(msg, userSession.name, userSession.room, "now");
    const messagesInCurrentRoom = filterMessages(userSession.room);

    io.to(userSession.room).emit("chat-message", {
      messagesInCurrentRoom,
      loggedInUser: userSession,
    });
  });

  socket.on("switch-room", (data) => {
    const { userSwitch, room } = data;
    const userSession = getUser(socket.id);

    if (userSession.room !== room.roomName) {
      socket.leave(userSession.room);
      io.to(userSession.room).emit("left", `${userSession.name} left the room`);
      const user = switchRoom(socket.id, room.roomName);
      const checkRoomsOnSocket = getRooms();
      const remove = removeRoom(checkRoomsOnSocket);
      socket.join(room.roomName);
      io.to(room.roomName).emit(
        "joined",
        `${userSession.name} joined ${room.roomName}`
      );
      socket.emit("current-room", room.roomName);
      io.emit("room-session", remove);
      getMessages(userSession.room, socket);

      // console.log(io.sockets.adapter.rooms);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
}

io.on("connection", onConnection);

function getMessages(room, socket) {
  const userSession = getUser(socket.id);
  const messagesInCurrentRoom = filterMessages(room);
  io.to(room).emit("chat-message", {
    messagesInCurrentRoom,
    loggedInUser: userSession,
  });
}

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
