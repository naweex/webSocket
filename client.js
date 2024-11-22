const teacherSocket = io('http://localhost:3000/teacher');
teacherSocket.on('connect' , data => {
    teacherSocket.emit('teacherClient' , 'hello server i am client') //emit for send data and on for reading data
    teacherSocket.on('teacherServer' , data => {
        console.log(data);
    })
}) 
const studentSocket = io('http://localhost:3000/student');
studentSocket.on('connect' , data => {
    studentSocket.emit('studentClient' , 'hello server i am client') //emit for send data and on for reading data
    studentSocket.on('studentServer' , data => {
        console.log(data);
    })
}) 