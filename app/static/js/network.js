var socket = io.connect('http://67.222.130.183');

Network = {
  getMatchHistory: function (cb) {
    socket.emit('get_match_history')
    socket.on('history', function (data) {
      cb(data)
    })
  },

  getMyMonsters: function (cb) {
    socket.emit('get_my_monsters')
    socket.on('monsters', function (data) {
      cb(data)
    })
  },
  
  getFriends: function (cb) {
    socket.emit('get_friends')
    socket.on('friends', function (data) {
      cb(data)
    })
  },
  
  askFight: function (eid, cb) {
    socket.emit('ask_fight', { eid: eid })
    socket.on('ok', function () {
      cb()
    })
  }
}

socket.on('connect', function (data) {
  Network.myid = socket.socket.sessionid;
  
  alert(data);
  console.log(data);
  
  socket.emit('hello', { fbid: '1063020932' });

  socket.on('error', function (err) { Game.error(err.type+": "+err.msg); })

  // OR OK
  socket.on('welcome', function () {
    Game.on_welcome();
    
    socket.on('fight', function (data) {
      var fightID = data.fid;
      var enemyID = data.eid;
      var data = data.data
      
      Game.on_fight(fightID, enemyID, fight);
    })
  })
});

socket.on('disconnect', function () {
  // TODO
});
