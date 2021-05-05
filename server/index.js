const express = require("express");
const app = express();
const port = process.env.PORT || 6969;
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

const {addUser, removeUser, getUser, getUsersInRoom, addUserToRoom, users} = require('./users')

io.on("connection", (socket) => {
    console.log("Client was connected", socket.id);
    
    socket.on('add-to-user-database', (name) => {
        const {user, error} = addUser({id: socket.id, name})
        const loggedInUser = getUser(socket.id)
        socket.emit('user-session', loggedInUser)
    })

    socket.on('create-room', (msg) => {
        console.log(msg)
        const user = addUserToRoom(msg.userInfo.id, msg.roomInfo.roomName, msg.roomInfo.password)
        const rooms = io.of("/").adapter.rooms;
        socket.emit('room-session', user)
        socket.join(msg.roomInfo.roomName)
    })

    socket.emit('room-session', users)

  socket.on("join", (user) => {
    console.log(user);
  });

  /* socket.broadcast.emit('user-connected', socket.id)
    socket.emit('return-message', "Welcome!") */

  /* socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })

    //all 
    //io.emit('user-connected', socket.id)

    // all but self
    

    // only to self 
    socket.emit('return-message', "Welcome!")

    socket.on('join-room', (data) => {
        socket.join(data.room)

        console.log("rooms:",io.sockets.adapter.rooms)
        socket.to(data.room).emit('joined-room', `A user just joined the room ${socket.id}`)
    })*/

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
