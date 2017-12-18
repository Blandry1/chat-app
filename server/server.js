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

io.on('connection', function (socket) { //step3
  console.log('New user connected');

  socket.emit('newEmail', { //send data to socket.on
    from: 'mike@example.com',
    text: 'Hey. Hows it going?',
    createdAt: 123
  });

  socket.on('createEmail', function (newEmail) { //receive data from 'socket.emit('<name>')'
    console.log('createEmail', newEmail);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port , () => {  //step2: server listens on port#
  console.log(`Server is up on port ${port}`);
});
