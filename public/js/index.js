var socket = io();

socket.on('connect', function ()  {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'benten',
    text: 'whats up'
  });
});

socket.on('newMessage', function (message) {
  console.log('New message received', message )
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
