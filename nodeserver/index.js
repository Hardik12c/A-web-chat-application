const io=require("socket.io")(3000, {
    cors: {
      origin: '*',
    }
  });

const users={};
let name;
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('message-send',message=>{
        socket.broadcast.emit('recieved',{message:message, name:users[socket.id]}); 
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    })
})