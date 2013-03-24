C = {
fontFamily: 'Calibri,Geneva,Arial',
headHeight: 100,
actionsHeight : 150,
vsWidth: 150, vsHeight: 50,
pWidth: 150, pHeight: 150,
hpWidth: 400, hpHeight: 100,
vsSpace: 5, pBordSpace: 40, hpBordSpace: 20, actionsSpace: 20,
pi: Math.PI,

// load the images and set the basic variables
init : function () {
	C.ctx = document.getElementById('canvas').getContext('2d');
	C.cw = document.getElementById('canvas').width,
	C.ch = document.getElementById('canvas').height;
	
	C.monFriends = ['kdousse', 'basile.vu1'];
	C.trainers = ['luca.bron', 'sacha.bron'];
	
	C.p1 = new Image();
	C.p1.onload = function() {
		C.p2 = new Image();
		C.p2.onload = function() {	
			C.lp1 = new Image();
			C.lp1.onload = function() {
				C.lp2 = new Image();
				C.lp2.onload = function() {
					// C.drawEnemyChoice();
				} 
				C.lp2.src = 'http://graph.facebook.com/' + C.trainers[1] + '/picture';
			} 
			C.lp1.src = 'http://graph.facebook.com/' + C.trainers[0] + '/picture';
		} 
		C.p2.src = 'http://graph.facebook.com/' + C.monFriends[1] + '/picture?width=150&height=150';
	} 
	C.p1.src = 'http://graph.facebook.com/' + C.monFriends[0] + '/picture?width=150&height=150';
	
	C.headWidth = C.cw;
	C.battleWidth = C.cw;
	C.actionsWidth = C.cw;
	
	C.battleHeight = C.ch - (C.headHeight + C.actionsHeight);
	
	C.h1 = 0;
	C.h2 = C.h1 + C.headHeight;
	C.h3 = C.h2 + C.battleHeight;
	C.h4 = C.ch;
	
	C.ctx.strokeRect(0, 0, C.cw, C.ch);
	
	/*C.drawTextDialog("Welcome to MonsterFriends!", "Do you want to play?", function () {
		C.drawButton(580, C.h3+50, 60, 42, "Yes", function () { console.log("Oui!") });
		C.drawButton(680, C.h3+50, 60, 42, "No", function () { console.log("Non!") });
	})*/
},

// function used to draw the game
drawFight : function () {
	
	// p1 vs p2
	C.imgSize = 50;
	C.fontSize = 20;
	C.font = C.fontSize+ 'pt ' + C.fontFamily;
	
	var ctx = C.ctx;
	ctx.drawImage(C.lp1, C.headWidth/2 - C.imgSize*1.5, C.headHeight/2 - C.imgSize/2);
	ctx.drawImage(C.lp2, C.headWidth/2 + C.imgSize/2 , C.headHeight/2 - C.imgSize/2);
	ctx.font = (C.font);
	ctx.fillText('vs', C.headWidth/2 - C.fontSize/2, C.headHeight/2);
	
	// players 
	ctx.drawImage(C.p1, C.pBordSpace + 50, C.h3-(C.pHeight + C.pBordSpace));
	ctx.drawImage(C.p2, C.battleWidth-(C.pWidth + C.pBordSpace + 50), C.h2 + C.pBordSpace);
	
	var r = 20;
	var vsw = C.vsWidth;
	var vsh = C.vsHeight;
	var vss = C.vsSpace;
	var hw = C.hpWidth;
	var bw = C.battleWidth;
	var hh = C.hpHeight;
	var ps = C.pBordSpace;
	var hps = C.hpBordSpace;
	
	var pi = C.pi;
	var h2 = C.h2;
	var h3 = C.h3;
	var h4 = C.h4;
	
	// name, lvl, hp
	
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgb(100,100,100)';
	ctx.fillStyle = 'rgb(100,100,100)';
	
	// containers
	C.drawRoundedRect(20, hps, h2 + hps, hw, hh);
	ctx.beginPath();
	ctx.arc(hps + hw - 20, h2 + hps + hh - 20, 20, 0, 0.5*pi, false);
	ctx.lineTo(hps + hw + 50, h2 + hps + hh);
	ctx.lineTo(hps + hw, h2 + hps + hh - 20);
	ctx.fill();
	
	C.drawRoundedRect(20, bw - (hw + hps), h3 - (hh + hps), hw, hh);
	ctx.beginPath();
	ctx.arc(bw - (hw + hps) + r, h3 - (hh + hps) + r, r, pi, 1.5*pi, false);
	ctx.lineTo(bw - (hw + hps + 50), h3 - (hh + hps));
	ctx.lineTo(bw - (hw + hps), h3 - (hh + hps) + 20);
	ctx.fill();
	
	// test values
	var totHp1 = 320;
	var hp1 = 280;
	var totHp2 = 300;
	var hp2 = 280;
	var level1 = 30;
	var level2 = 42;
	var name1 = 'Protectator';
	var name2 = 'Flagoul';


	
	// hp bars and values
	C.drawHpBar(2*hps, h2 + hps + 50, hw-2*hps, 12, hp2, totHp2);
	C.drawHpBar(bw - hw, h3 - (hh + hps) + 50, hw - 2*hps, 12, hp1, totHp1);
	
	
	ctx.font = '16pt Calibri,Geneva,Arial';
	ctx.fillStyle = 'rgb(100,100,100)';
	ctx.textAlign = 'center';
	
	ctx.fillText (name2, hps + hw/5, h2 + hps + (hh/3));
	ctx.fillText (name1, bw - (hw + hps) + hw/5, h3 - (hh + hps) + (hh/3));
	
	ctx.fillText ('lvl ' + level2, hps + (hw/5)*4, h2 + hps + (hh/3));
	ctx.fillText ('lvl ' + level1, bw - (hw + hps) + (hw/5)*4, h3 - (hh + hps) + (hh/3));
	
	ctx.fillText (hp1 + ' / ' + totHp2, hps + hw/2, h2 + hps + (hh/6)*5);
	ctx.fillText (hp2 + ' / ' + totHp1, bw - (hw + hps) + hw/2, h3 - (hh + hps) + (hh/6)*5);
	
	
	
	// actions
	
	var aw = C.actionsWidth;
	var as = C.actionsSpace;
	var ah = C.actionsHeight;
	
	C.drawRoundedRect(10, as, h3+as, aw - 2*as, ah-2*as);
	ctx.stroke();
},

// Draws the menu
drawMenu : function (oid) {
	var buttonWidth = 200;
	var buttonHeight = 50;
	
	if(oid == 0) {	
		C.drawButton(C.cw/2 - buttonWidth/2, C.ch/2 - buttonHeight/2 - (buttonHeight + 20) , 200 , 50, "New Fight", function () {
			Controller.changeScene(Scene.ENEMYCHOICE);
		});
	}
	else {
		C.drawButton(C.cw/2 - buttonWidth/2, C.ch/2 - buttonHeight/2 - (buttonHeight + 20) , 200 , 50, "Resume Fight", function () {
			Controller.changeScene(Scene.FIGHT);
		});
	}
	
	C.drawButton(C.cw/2 - buttonWidth/2, C.ch/2 - buttonHeight/2, 200 , 50, "My team", function () { Controller.changeScene(Scene.MONSTERS); });
	C.drawButton(C.cw/2 - buttonWidth/2, C.ch/2 - buttonHeight/2 + (buttonHeight + 20), 200 , 50, "History", function () { Controller.changeScene(Scene.HISTORY); });
	
},

// Just a simple notification or something to draw on the current screen
drawVictory : function () {
	
},


// Draws the match history
drawHistory : function (data) {
	C.fontSize = 20;
	C.font = C.fontSize + 'pt Calibri,Geneva,Arial';
	
	var ctx = C.ctx;
	ctx.font = (C.font);
	
	var entryWidth = 780;
	var entryHeight = 40;
	var entryVSpacing = 20;
	
	C.drawRoundedRect(20, 400-entryWidth/2, entryVSpacing, entryWidth, entryHeight);
	var i = 0
	for (var entry in data) {
		C.drawRoundedRect(20, 400-entryWidth/2, (i+1)*entryVSpacing, entryWidth, entryHeight);
		// Afficher les données de l'historique
	}
},

// Draws the monsters 
drawMonsters : function (data) {

	var spaces = 10;
	var margin = 10;
	var sumHeights = C.ch - 7*spaces;
	var containerWidth = C.cw - 2*margin;
	var containerHeight = sumHeights/6;
	var lp1Size = 50;
	
	var monsters = ['kdousse','basile.vu1','sacha.bron','luca.bron','',''];
	
	
	
	C.ctx.fillStyle = 'rgb(137,137,137)';
	C.ctx.fillRect (1, 1, C.cw-2, C.ch-2);
	C.ctx.fillStyle = 'rgb(197,197,197)';

	for (var i = 0; i< monsters.length;i++){
		C.ctx.fillRect(margin, containerHeight*i + (i+1)*spaces, containerWidth, containerHeight);
		var imgFile = new Image();
		imgFile.src = 'http://graph.facebook.com/' + data[i].fb_id + '/picture';
		var level = data[i].level;
		var hpMax = data[i].pv_max;
		var hp = data[i].pv;
		C.ctx.drawImage(imgFile, margin*2, containerHeight*i + (i+1)*spaces + (containerHeight)/2 - lp1Size/2);
		C.drawHpBar(margin*2, containerHeight*i + (i+1)*spaces + (containerHeight)/2 - lp1Size/2, 100, 20, hp, hpMax);
	}

},

// Draws the enemy choice
drawEnemyChoice : function () {

	C.ctx.font = "22px "+C.fontFamily;
	C.ctx.textAlign = "center";
	C.ctx.fillText('Choose the trainer you want to fight !', C.cw/2, 50);
	
	var h1 = 0;
	var h2 = h1 + 80;
	
	var totHeight = C.ch - h2;
	var height = 50;
	var width = 50;
	var horSpace = (C.cw - width*5)/6;
	var verSpace = (C.ch - h2 - height*5)/6
	
	var trainers = ['kdousse']; // Todo
	
	for (var i = 0; i<trainers.length; i++) {
		C.ctx.drawImage(C.lp2, (horSpace + width)*(i%5) + horSpace, (verSpace + height)*(Math.floor(i/5)) + h2 + verSpace);
	}
	
	//$(
	
	
},

// Draws text in the dialog box
drawTextDialog: function (line1, line2, callback) {
  var s = C.actionsSpace;
	var w = C.actionsWidth-2*s;
  var h = C.actionsHeight-2*s;
	
  var m = 10;
	
	var x = s;
	var y = C.h3+s;
	
	function drawLines(n, line1, line2) {
		var n1 = Math.min(line1.length, n)
		var n2 = Math.max(Math.min(line2.length, n-line1.length), 0)
		
		if(n == line1.length + line2.length + 1 && callback !== undefined) {
			callback()
			return false
		}
		
		var chars1 = line1.slice(0, n1);
		var chars2 = line2.slice(0, n2);
		
		C.ctx.save();
		C.ctx.translate(x+m, y+m);
		
		C.ctx.clearRect(0, 0, w-2*m, h-2*m);

		C.ctx.font = "22px "+C.fontFamily;
		C.ctx.fillStyle = "black";
		C.ctx.textAlign = "left";
		C.ctx.textBaseline = "top";
		
		C.ctx.fillText(chars1, m, m, w-2*m);
		
		C.ctx.textBaseline = "bottom";
		C.ctx.fillText(chars2, m, h-3*m, w-2*m);
		
		C.ctx.restore();
		
		setTimeout(function () {
			drawLines(++n, line1, line2);
		}, 80);
	}
	
	drawLines(0, line1, line2);
},

// A function used to draw buttons
drawButton: function (x, y, w, h, text, callback) {
	var m = 10;
	
	C.ctx.save();
	C.ctx.translate(x, y);
	
	C.ctx.strokeStyle = "black";
	//C.ctx.strokeRect(x, y, w, h);
	
	C.drawRoundedRect(3, 0, 0, w, h);
	
	C.ctx.font = "22px "+C.fontFamily;
	C.ctx.fillStyle = "black";
	C.ctx.textAlign = "left";
	C.ctx.textBaseline = "top";
	C.ctx.fillStyle = "black";
	C.ctx.fillText(text, m, m, w-2*m);
	
	C.ctx.restore();
	
	$("#canvas").bind('click', function (e) {
		var ex = e.offsetX;
		var ey = e.offsetY;
		if(ex >= x && ex <= x+w && ey >= y && ey <= y+h) {
			callback();
		}
	})
},

unbindButtons: function () {
	$("#canvas").unbind('click')
},

// A very useful function to draw rectangle with curved angles
drawRoundedRect : function (r, startx, starty, width, height) {
	var ctx = C.ctx;
	var pi = C.pi;
	var x = startx;
	var y = starty;
	var w = width;
	var h = height;
	
	ctx.beginPath();
	ctx.arc(x + r, y + r, r, pi, 1.5*pi, false);
	ctx.lineTo(x + w - r, y);
	ctx.arc(x + w - r, y + r, r, 1.5*pi, 0, false);
	ctx.lineTo(x + w, y + h - r);
	ctx.arc(x + w - r, y + h - r, r, 0, 0.5*pi, false);
	ctx.lineTo(x + r, y + h);
	ctx.arc(x + r, y + h - r, r, 0.5*pi, pi, false);
	ctx.lineTo(x, y + r);
	ctx.stroke();
},

// Draws hp bars
drawHpBar : function (x, y, w, h, hp, hpMax) {
	
	var percent = hp/hpMax;
	var ctx = C.ctx;
	
	if(percent > 0.5 ) {
		C.ctx.fillStyle = 'rgb(148,240,59)';
	}
	else if (percent <= 0.5 && percent >= 0.2) {
		C.ctx.fillStyle = 'rgb(255,200,59)';
	}
	else {
		C.ctx.fillStyle = 'rgb(255,72,59)'
	}
	
	ctx.clearRect(x, y, w, h);
	C.drawRoundedRect(h/2, x, y, w, h);
	
	if(hp <= hpMax) C.drawRoundedRect((h-2)/2, x, y, w*percent, h);
	else C.drawRoundedRect((h-2)/2, x, y, w, h);
	ctx.fill();

},

// The function used to clear the canvas
clear : function () {
	C.ctx.clearRect(0,0,C.cw, C.ch);
},

drawConnectionRequired: function () {
	C.ctx.clear()
	C.ctx.save()
	C.ctx.translate(400, 20)
	
	C.ctx.font = "22px "+C.fontFamily;
	C.ctx.fillStyle = "black";
	C.ctx.textAlign = "center";
	C.ctx.textBaseline = "top";
	
	C.ctx.fillText("You have to be connected with Facebook to play.", 0, 0, 800);
	
	C.ctx.restore()
},

drawAttackDialog: function (a1, a2, a3, a4, cb) {
	C.drawTextDialog("It's your turn", "Choose an attack:", function () {
		C.drawButton(580, C.h3+10, 60, 42, a1.name, function () { cb(a1.id) });
		C.drawButton(680, C.h3+10, 60, 42, a2.name, function () { cb(a2.id) });
		C.drawButton(580, C.h3+70, 60, 42, a3.name, function () { cb(a3.id) });
		C.drawButton(680, C.h3+70, 60, 42, a4.name, function () { cb(a4.id) });
	})
},

}
