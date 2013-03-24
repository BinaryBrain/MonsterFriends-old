var socket = io.connect();

Network = {
  init: function (cb) {
    socket.on('connect', function (data) {
      Network.myid = socket.socket.sessionid;
      
      console.log("Connected");
      
      socket.emit('hello', "1236701567" /*Facebook.getUserID()*/ );

      socket.on('error', function (err) { Controller.error(err); })

      socket.on('welcome', function () {
        cb()
        
        socket.on('new_fight', function (oid) {
          Controller.newFight(oid);
        })
      })
    });

    socket.on('disconnect', function () {
      // TODO
    });   
  },
  
  getCurrentFight: function (cb) {
    socket.emit('get_current_fight');
    socket.on('current_fight', function (data) {
      console.log(data)
      cb(data);
    });
  },
  
  getFightInfos: function (cb) {
    socket.emit('get_fight_info');
    socket.on('fight_info', function (data) {
      cb(data);
    });
  },
  
  getMatchHistory: function (cb) {
    socket.emit('get_history');
    socket.on('history', function (data) {
      cb(data);
    });
  },
  
  getMyMonsters: function (cb) {
    socket.emit('get_monsters');
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
	
	setChosenAttack: function (aid, cb) {
    socket.emit('use_attack', aid);
    socket.on('fight_info', function (data) {
      cb(data);
    });
  },
	
	setChosenFriend: function (fid, cb) {
    socket.emit('fight_friend', fid);
    socket.on('fight_info', function (data) {
      cb(data);
    });
  },
  
//  getAvaiableFriends: function (ids, cb) {
//    socket.emit('get_avaiable_friends', ids);
//    socket.on('avaiable_friends', function (data) {
//      cb(data);
//    });
//  },

  attack: function (aid) {
    socket.emit('attack', aid );
  },
}
