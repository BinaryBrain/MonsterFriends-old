var socket = io.connect('http://67.222.130.183');

socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
