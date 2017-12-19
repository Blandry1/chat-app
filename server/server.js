const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);  //step0 for opening socket
var io = socketIO(server);

app.use(express.static(publicPath));  //step1: use express middleware to grab file specified.

io.on('connection',  (socket) => { //step3: opens input/output interface
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('Create new message', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port , () => {  //step2: server listens on port#
  console.log(`Server is up on port ${port}`);
});
