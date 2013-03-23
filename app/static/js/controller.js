/*! 
 *
 * controller.js
 *
 */

// Controls things. Yeah.

$(function () {
	
})


/*
 * Console Object
 *
 * Represents the Console during a fight. Used to show messages
 * 
 */
Console = {

	archieveMessage: function (msg) {
		var consoleNode = $("#console");
		var html = msg + "<br>";
		consoleNode.html(consoleNode.html() + html);
		consoleNode.scrollTop(consoleNode[0].scrollHeight);
	},
	
	ability: function (monsterName, abilityName) {
		var msg = "<span class='monsterName'>"+monsterName+"</span> used <span class='abilityName'>"+abilityName+"</span> !";
		Console.archieveMessage(msg);
	},
	
	damage: function (monsterName, hpLost, percentHpLost) {
		var msg = "<span class='monsterName'>"+monsterName+"</span> lost <span class='number'>"+hpLost+"</span> ("+percentHpLost+"%) HP !";
		Console.archieveMessage(msg);
	},
	
	heal: function (monsterName, hpHealed, percentHpHealed) {
		var msg = "<span class='monsterName'>"+monsterName+"</span> restored <span class='number'>"+hpHealed+"</span> ("+percentHpHealed+"%) HP !";
		Console.archieveMessage(msg);
	},
	
	effective: function () {
		Console.archieveMessage("It's super effective !");
	},
	
	ineffective: function () {
		Console.archieveMessage("It's not very effective...");
	},
	
	turn: function (turnNumber) {
		var msg= "<hr><span class='turnNumber'>Turn " + turnNumber + "</span>";
		Console.archieveMessage(msg);
	}
}