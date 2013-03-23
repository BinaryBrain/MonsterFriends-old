C = {

headHeight: 100,
actionsHeight : 150,
vsWidth: 150, vsHeight: 50,
pWidth: 160, pHeight: 160,
hpWidth: 400, hpHeight: 50,
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
	ctx.beginPath();
	ctx.arc(hps + r, h2 + r, r, pi, 1.5*pi, false);
	ctx.lineTo(hps + hw - r, h2);
	ctx.arc(hps + hw - r, h2 + r, r, 1.5*pi, 0, false);
	ctx.lineTo(hps + hw, h2 + hh - r);
	ctx.arc(hps + hw - r, h2 + hh + r, r, 0, 0.5*pi, false);
	ctx.lineTo(hps + r, h2 + hh + 2*r);
	ctx.arc(hps + r, h2 + hh + r, r, 0.5*pi, pi, false);
	ctx.lineTo(hps, h2 + r);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.arc(bw - (hw + hps - r), h3 - (hh + hps + r), r, pi, 1.5*pi, false);
	ctx.lineTo(bw - (hps + r), h3 - (hh + hps + 2*r));
	ctx.arc(bw - (hps + r), h3 - (hh + hps + r), r, 1.5*pi, 0, false);
	ctx.lineTo(bw - (hps), h3 - (hps + r));
	ctx.arc(bw - (hps+r), h3 - (hps + r), r, 0, 0.5*pi, false);
	ctx.lineTo(bw - (hw + hps - 2*r), h3 - (hps));
	ctx.arc(bw - (hw + hps - r), h3 - (hps+r), r, 0.5*pi, pi, false);
	ctx.lineTo(bw - (hw + hps), h3 - (hh + hps + r));
	ctx.stroke();
	
	
	// actions
	
	var aw = C.actionsWidth;
	var as = C.actionsSpace;
	
	ctx.beginPath();
	ctx.arc(as + r, h3 + as, r, pi, 1.5*pi, false);
	ctx.lineTo(aw - (as + r), h3 + as - r);
	ctx.arc(aw - as - r, h3 + as, r, 1.5*pi, 0, false);
	ctx.lineTo(aw - as, h4 - (as + r));
	ctx.arc(aw - (as + r), h4 - (as + r), r, 0, 0.5*pi, false);
	ctx.lineTo(aw - (as + 2*r), h4 - as);
	ctx.arc(as + r, h4 - (as+r), r, 0.5*pi, pi, false);
	ctx.lineTo(as, h3 + as);
	ctx.stroke();
},

// Draws the menu
drawMenu : function () {
	// TODO
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

}

}
