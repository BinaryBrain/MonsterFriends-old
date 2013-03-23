var ctx;
var canWidth, canHeight;
var pWidth = 160, pHeight = 160;
var hpWidth = 400, hpHeight = 50;
var pBorderSpace = 20;
var hpBorderSpace = 20;
var pi = Math.PI;

var p1, p2;
		
// load the images and set the basic variables
function init(){
	
	ctx = document.getElementById('canvas').getContext('2d');
	canWidth = document.getElementById('canvas').width,
	canHeight = document.getElementById('canvas').height;
	
	p1 = new Image();
	p1.onload = function() {
		p2 = new Image();
		p2.onload = function() {
			draw();
		}
		p2.src = '../static/img/p2.jpg';
	}
	p1.src = '../static/img/p1.jpg';
		
	
}

// function used to draw the game
function draw() {
	
	// border
	ctx.lineWidth = 1;
	ctx.strokeRect(0, 0, canWidth, canHeight);
	
	// players 
	ctx.drawImage(p1, pBorderSpace, canHeight-(pHeight + pBorderSpace));
	ctx.drawImage(p2, canWidth-(pWidth + pBorderSpace), pBorderSpace);
	
	// name, lvl, hp
	/*ctx.strokeRect(hpBorderSpace, hpBorderSpace, hpWidth, hpHeight);
	ctx.strokeRect(canWidth/2, canHeight-(hpHeight + hpBorderSpace), hpWidth, hpHeight);*/
	
	var r = 20;
	var hbs = hpBorderSpace;
	var hw = hpWidth;
	var hh = hpHeight;
	var cw = canWidth;
	var ch = canHeight;
	
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(hbs + r, hbs + r, r, pi, 1.5*pi, false);
	ctx.lineTo(hbs + hw - r, hbs);
	ctx.arc(hbs + hw - r, hbs + r, r, 1.5*pi, 0, false);
	ctx.lineTo(hbs + hw, hbs + hh - r);
	ctx.arc(hbs + hw - r, hbs + hh + r, r, 0, 0.5*pi, false);
	ctx.lineTo(hbs + r, hbs + hh + 2*r);
	ctx.arc(hbs + r, hbs + hh + r, r, 0.5*pi, pi, false);
	ctx.lineTo(hbs, hbs + r);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.arc(cw - (hw + hbs - r), ch - (hh + hbs + r), r, pi, 1.5*pi, false);
	ctx.lineTo(cw - (hbs + r), ch - (hh + hbs + 2*r));
	ctx.arc(cw - (hbs + r), ch - (hh + hbs + r), r, 1.5*pi, 0, false);
	ctx.lineTo(cw - (hbs), ch - (hbs + r));
	ctx.arc(cw - (hbs+r), ch - (hbs + r), r, 0, 0.5*pi, false);
	ctx.lineTo(cw - (hw + hbs - 2*r), ch - (hbs));
	ctx.arc(cw - (hw + hbs - r), ch - (hbs+r), r, 0.5*pi, pi, false);
	ctx.lineTo(cw - (hw + hbs), ch - (hh + hbs + r));
	ctx.stroke();
	
	
}
