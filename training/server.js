const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
app.use(express.static("./"))
const socketIO = require('socket.io')
const io = socketIO(server ,{
    cors : {
        origin : '*'
    }
})
io.on('connection' , (socket) => {
    socket.on('clientMessage' , data => {
        io.emit('serverMessage' , data)
    })
    socket.join(['expressJs' , 'nodeJs']) //rooms
    socket.leave('expressJs') //leave room
    //socket.compress(false).emit() // socket by default compress messages with this code we can uncompress it
    io.to('nodeJs').emit('new user added') //send message to nodeJs room
    console.log(socket.rooms);
})
server.listen(3000 , () => console.log('run on port 3000'))