const socket = io('http://localhost:3000');
socket.on('connect' , data => {
    const sendBtn = document.getElementById('sendBtn')
    sendBtn.addEventListener('click' , (e) => {
    const textBox = document.getElementById('text');
    const message = textBox.value;
    if(!message) return alert('text box can not be empty')
        socket.emit('clientMessage' , message)
    textBox.value = ''
    })
})
