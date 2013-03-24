C = {

headHeight: 100,
actionsHeight : 150,
vsWidth: 150, vsHeight: 50,
pWidth: 160, pHeight: 160,
hpWidth: 400, hpHeight: 100,
vsSpace: 5, pBordSpace: 20, hpBordSpace: 20, actionsSpace: 20,
pi: Math.PI,

//attacks: {'','','',''},
		
// load the images and set the basic variables
init : function (){
	
	C.ctx = document.getElementById('canvas').getContext('2d');
	C.cw = document.getElementById('canvas').width,
	C.ch = document.getElementById('canvas').height;
	
	C.p1 = new Image();
	C.p1.onload = function() {
		C.p2 = new Image();
		C.p2.onload = function() {	
			C.lp1 = new Image();
			C.lp1.onload = function() {
				C.lp2 = new Image();
				C.lp2.onload = function() {
					C.drawFight(); // change
				} 
				C.lp2.src = '../static/img/lp2.jpg';
			} 
			C.lp1.src = '../static/img/lp1.jpg';
		} 
		C.p2.src = '../static/img/p2.jpg';
	} 
	C.p1.src = '../static/img/p1.jpg';
	
	C.headWidth = C.cw;
	C.battleWidth = C.cw;
	C.actionsWidth = C.cw;
	
	C.battleHeight = C.ch - (C.headHeight + C.actionsHeight);
	
	C.h1 = 0;
	C.h2 = C.h1 + C.headHeight;
	C.h3 = C.h2 + C.battleHeight;
	C.h4 = C.ch;
	
},

// function used to draw the game
drawFight : function () {
	
	// p1 vs p2
	C.imgSize = 50;
	C.fontSize = 20;
	C.font = C.fontSize + 'pt Calibri,Geneva,Arial';
	
	var ctx = C.ctx;
	ctx.drawImage(C.lp1, C.headWidth/2 - C.imgSize*1.5, C.headHeight/2 - C.imgSize/2);
	ctx.drawImage(C.lp2, C.headWidth/2 + C.imgSize/2 , C.headHeight/2 - C.imgSize/2);
	ctx.font = (C.font);
	ctx.fillText('vs', C.headWidth/2 - C.fontSize/2, C.headHeight/2);
	
	// players 
	ctx.drawImage(C.p1, C.pBordSpace, C.h3-(C.pHeight + C.pBordSpace));
	ctx.drawImage(C.p2, C.battleWidth-(C.pWidth + C.pBordSpace), C.h2 + C.pBordSpace);
	
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
	
	ctx.lineWidth = 2;
	C.drawRoundedRect(20, hps, h2 + hps, hw, hh);
	C.drawRoundedRect(20, bw - (hw + hps), h3 - (hh + hps), hw, hh);
	
	
	// actions
	
	var aw = C.actionsWidth;
	var as = C.actionsSpace;
	var aw = C.actionsWidth;
	var ah = C.actionsHeight;
	
	C.drawRoundedRect(20, as, h3 + as, aw - 2*as, ah - 2*as);
},

// Draws the menu
drawMenu : function (oid) {

	C.fontSize = 20;
	C.font = C.fontSize + 'pt Calibri,Geneva,Arial';
	
	var ctx = C.ctx;
	ctx.font = (C.font);
	
	var buttonWidth = 200;
	var buttonHeight = 40;
	var buttonVSpacing = 20;
	
	C.drawRoundedRect(20, 400-buttonWidth/2, buttonVSpacing, buttonWidth, buttonHeight);
	C.drawRoundedRect(20, 400-buttonWidth/2, buttonVSpacing+(buttonHeight+buttonVSpacing), buttonWidth, buttonHeight);
	C.drawRoundedRect(20, 400-buttonWidth/2, buttonVSpacing+(buttonHeight+buttonVSpacing)*2, buttonWidth, buttonHeight);
	ctx.textAlign="center";
	var msg;
	oid==0 ? msg='Fight un random péon' : msg='Fight '+oid;
	ctx.fillText(msg, C.cw/2, buttonVSpacing+buttonHeight/2+8);
	ctx.fillText('Résumé la vie', C.cw/2, buttonVSpacing*2+buttonHeight/2+8+buttonHeight);
	ctx.fillText('Historique la vie', C.cw/2, buttonVSpacing*3+buttonHeight/2+8+buttonHeight*2);


	
},

// Just a simple notification or something to draw on the current screen
drawVictory : function () {
	
},

// Draws the elvove screen
drawEvolution : function () {

},

// Draws the match history
 drawHistory : function () {

},

// Draws the monsters 
drawMonsters : function () {

},

// Draws the enemy choice
drawEnemyChoice : function () {

},

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
}

}
