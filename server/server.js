const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const app = express();
const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected');  


  socket.emit('newMessage',{
    from :'tauseef@gmail.com',    
    text: 'Hey, whats going on',
    createdAt: 123
  });

  socket.on('createMessage', (newMessage) =>{
    console.log('createMessage', newMessage);
  });

  socket.on('disconnect', ()=>{
    console.log('User was disconnected');
  });
  
});

server.listen(port, ()=>{
  console.log(`Server is running on port ${port} ...`);
});