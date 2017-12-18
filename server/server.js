const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);  //step0 for opening socket
var io = socketIO(server);

app.use(express.static(publicPath));  //step1: use express middleware to grab file specified.

io.on('connection',  (socket) => { //step3: opens input/output interface
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('Create new message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port , () => {  //step2: server listens on port#
  console.log(`Server is up on port ${port}`);
});
