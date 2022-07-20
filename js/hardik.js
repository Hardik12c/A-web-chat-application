const socket=io('http://localhost:3000')

const form =document.getElementById('send-box');
const messageinput=document.getElementById('message-input');
const messagecontainer=document.querySelector('.container');

var audio= new Audio('ting.mp3');


const append=(message,position)=>{
    const messageelement=document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const mess=messageinput.value;
    append(`You: ${mess}`,'right');
    socket.emit('message-send',mess);
    messageinput.value='';
})
const name=prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left');
})
socket.on('recieved',data=>{
    append(`${data.name}: ${data.message}`,'left');
})
socket.on('leave',name=>{
    append(`${name} has left `, 'left');
})