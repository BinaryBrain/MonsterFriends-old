var socket = io.connect('http://67.222.130.183');

socket.on('connect', function (data) {
  myid = socket.socket.sessionid;
  alert(data);
  console.log(data);
  socket.emit('hello', { fbid: '1063020932' });

  socket.on('error', function (err) { alert(err.type)})
});
