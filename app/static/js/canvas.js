var ctx;
var cw, ch;
var headWidth, headHeight = 100;
var battleWidth, battleHeight;
var actionWidth, actionHeight = 150;
var pWidth = 160, pHeight = 160;
var hpWidth = 400, hpHeight = 50;
var pBordSpace = 20, hpBordSpace = 20;
var h1, h2, h3;
var pi = Math.PI;
var p1, p2;
		
// load the images and set the basic variables
function init(){
	
	ctx = document.getElementById('canvas').getContext('2d');
	cw = document.getElementById('canvas').width,
	ch = document.getElementById('canvas').height;
	
	p1 = new Image();
	p1.onload = function() {
		p2 = new Image();
		p2.onload = function() {
			draw();
		}
		p2.src = '../static/img/p2.jpg';
	}
	p1.src = '../static/img/p1.jpg';
	
	headWidth = cw;
	battleWidth = cw;
	actionWidth = cw;
	
	battleHeight = ch - (headHeight + actionHeight);
	
	h1 = 0;
	h2 = h1 + headHeight;
	h3 = h2 + battleHeight;
	h4 = ch;
	
}

// function used to draw the game
function draw() {
	
	// players 
	ctx.drawImage(p1, pBordSpace, h3-(pHeight + pBordSpace));
	ctx.drawImage(p2, battleWidth-(pWidth + pBordSpace), h2 + pBordSpace);
	
	// name, lvl, hp
	var r = 20;
	var hw = hpWidth;
	var bw = battleWidth;
	var hh = hpHeight;
	var ps = pBordSpace;
	var hps = hpBordSpace;
	
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
	
	
}
