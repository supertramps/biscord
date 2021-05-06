const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {pingTimeout: 25000});
const port = process.env.PORT || 6969;

const {addUser, removeUser, getUser, getUsersInRoom, addUserToRoom, users} = require('./users')


function onConnection(socket){
  console.log("Client was connected", socket.id);

  socket.on('join-lobby', (name) => {
      const {user, error} = addUser({id: socket.id, name, room: 'Lobby'})
      const loggedInUser = getUser(socket.id)
      socket.join("Lobby", () => {
        console.log('test')
        io.to(socked.id).emit('joined-succ', 'joined')
        io.to("Lobby").to('joined', `joined the room!`)
        /* io.emit('rooms updated', findRooms()) */
      })
      /* findRooms() */
      getRooms()
      ActiveRooms()
      socket.emit('user-session', loggedInUser)
  })

  socket.on('create-room', (msg) => {
      const user = addUserToRoom(msg.userInfo.id, msg.roomInfo.roomName, msg.roomInfo.password)
      socket.leave('Lobby')
      socket.join(msg.roomInfo.roomName)
      io.emit('room-session', getRooms())  
      /* const rooms = findRooms()
      console.log(rooms + " stringu") */
  })

  /* io.emit('room-session', findRooms()) */

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
}

io.on("connection", onConnection);

/* function findRooms() {
  var availableRooms = [];
  var rooms = io.sockets.adapter.rooms;
  console.log(rooms)
  if (rooms) {
      for (var room of rooms) {
        console.log(room)
          if (!rooms[room].hasOwnProperty(room)) {
              availableRooms.push(room);
          }
      }
  }
  console.log(availableRooms)
  return availableRooms;
} */

function ActiveRooms(){
  var activeRooms = [];
  Object.keys(io.sockets.adapter.rooms).forEach(room=>{
      var isRoom = true;
      Object.keys(io.sockets.adapter.sids).forEach(id=>{
          isRoom = (id === room)? false: isRoom;
      });
      if(isRoom)activeRooms.push(room);
  });
  console.log(activeRooms)
  return activeRooms;}

function getRooms() {
  const sockets = Object.keys(io.sockets.adapter.rooms)
  console.log(sockets)
  let rooms = []
  /* for(const socket of sockets){
    const actualRooms = Object.keys(socket.rooms).filter(room => room !== socket.id)
    rooms.push(actualRooms)
  }
  return [...new Set(rooms)] */
}

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
