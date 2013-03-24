var socket = io.connect();

Network = {
  getCurrentFight: function (cb) {
    socket.emit('get_current_fight');
    socket.on('current_fight', function (data) {
      cb(data);
    });
  },
  
  getFightInfos: function (cb) {
    socket.emit('get_fight_infos');
    socket.on('fight_infos', function (data) {
      cb(data);
    });
  },
  
  getMatchHistory: function (cb) {
    socket.emit('get_match_history');
    socket.on('history', function (data) {
      cb(data);
    });
  },
  
  getMyMonsters: function (cb) {
    socket.emit('get_my_monsters');
    socket.on('monsters', function (data) {
      cb(data);
    });
  },
  
  askFight: function (oid, cb) {
    socket.emit('ask_fight', oid);
    socket.on('ok_fight', function () {
      cb();
    });
  },
  
  getAvaiableFriends: function (ids, cb) {
    socket.emit('get_avaiable_friends', ids);
    socket.on('avaiable_friends', function (data) {
      cb(data);
    });
  },

  attack: function (fid, aid) {
    socket.emit('attack', { fid: fid, aid: aid });
  },
}

socket.on('connect', function (data) {
  Network.myid = socket.socket.sessionid;
  
  alert(data);
  console.log(data);
  
  socket.emit('hello', Facebook.getUserID());

  socket.on('error', function (err) { Controller.error(err); })

  socket.on('welcome', function () {
    socket.on('new_fight', function (oid) {
      Controller.newFight(oid);
    })
  })
});

socket.on('disconnect', function () {
  // TODO
});
