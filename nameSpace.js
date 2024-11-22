const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
app.use(express.static("./"))
const socketIO = require('socket.io')
const io = socketIO(server ,{
    cors : {
        origin : '*'
    },
    serverClient : true
})
io.on('connection' , () => {
    io.emit('broadCast' , 'hello everyone')
})
io.of('/teacher').on('connection' , (socket) => {
    socket.on('teacherClient' , (data) => {
        console.log(data);
    })
    socket.emit('teacherServer' , 'hello teacher i am your server')
})
io.of('/student').on('connection' , (socket) => {
    socket.on('studentClient' , (data) => {
        console.log(data);
    })
    socket.emit('studentServer' , 'hello student i am your server')
})
server.listen(3000 , () => console.log('run on port 3000'))

// CLIENT SIDE

const socket = io('http://localhost:3000');
socket.on('broadCast' , data => {
    console.log(data);
})
const teacherSocket = io('http://localhost:3000/teacher');
teacherSocket.on('connect' , data => {
    teacherSocket.emit('teacherClient' , 'message from teacher namespace') //emit for send data and on for reading data
    teacherSocket.on('teacherServer' , data => {
        console.log(data);
    })
}) 
const studentSocket = io('http://localhost:3000/student');
studentSocket.on('connect' , data => {
    studentSocket.emit('studentClient' , 'message from student namespace') //emit for send data and on for reading data
    studentSocket.on('studentServer' , data => {
        console.log(data);
    })
}) 