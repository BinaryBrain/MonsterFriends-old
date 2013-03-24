var socket = io.connect();

Network = {
  getCurrentFight: function (cb) {
    socket.emit('get_current_fight')
    socket.on('current_fight', function (data) {
      cb(data)
    })
  },
  
  getFightInfos: function (cb) {
    socket.emit('get_fight_infos')
    socket.on('fight_infos', function (data) {
      cb(data)
    })
  },
  
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
  
  askFight: function (oid, cb) {
    socket.emit('ask_fight', { oid: oid })
    socket.on('ok', function () {
      cb()
    })
  },
  
  getAvaiableFriends(ids, cb) {
    socket.emit('get_avaiable_friends', { ids: ids })
    socket.on('avaiable_friends', function (data) {
      cb(data)
    })
  },

  attack: function (fid, aid) {
    socket.emit('attack', { fid: fid, aid: aid })
  },
}

socket.on('connect', function (data) {
  Network.myid = socket.socket.sessionid;
  
  alert(data);
  console.log(data);
  
  socket.emit('hello', { fbid: '1063020932' });

  socket.on('error', function (err) { Game.error(err.type+": "+err.msg); })

  // OR OK
  socket.on('welcome', function (data) {
    var fighting = data.oid
    
    Controller.todo({ oid: oid });
    
    socket.on('fight', function (data) {
      var fightID = data.fid;
      var enemyID = data.oid;
      var data = data.data
      
      Game.on_fight(fightID, enemyID, fight);
    })
  })
});

socket.on('disconnect', function () {
  // TODO
});
