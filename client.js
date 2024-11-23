function initializeChatBox(){
    const localStorageValue = localStorage.getItem('messages')
    const messages = (localStorageValue? localStorageValue.split('#'): [] ).map(item => {
        if(item) return item
    })
    messages.forEach(item => {
        const paragraphElement = document.createElement('p')
        paragraphElement.innerText = item;
        const chatBox = document.querySelector('.chatBox')
        chatBox.appendChild(paragraphElement)
    });
}  
initializeChatBox()
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
socket.on('serverMessage' ,message => {
    let localStorageValue = localStorage.getItem('messages') ? localStorage.getItem('messages') + '#' + message : message
    localStorage.setItem('messages' , localStorageValue)
    const paragraphElement = document.createElement('p')
    paragraphElement.innerText = message;
    const chatBox = document.querySelector('.chatBox')
    chatBox.appendChild(paragraphElement)
})
// let count = 0;
// setInterval(() =>{
//     socket.volatile.emit('ping' , ++count)
// } , 1000)
