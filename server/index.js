const express = require('express');
const app = express();
const port = process.env.PORT || 6969;
const http = require('http')
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server)

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')

io.on("connection", (socket) => {
    console.log("Client was connected", socket.id);
    io.emit('return-message', "Welcome!")

    socket.on('add-to-user-database', (name, callback) => {
        const {user, error} = addUser({id: socket.id, name})
        /* if(error) return callback(error) */
    })

    socket.on('user-session', (socket) => {
        const user = getUser(socket.id)
        socket.emit(user)
    })


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

    socket.on('disconnect', () => {
        console.log('user disconnected')
    }) 
})

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
  };

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})