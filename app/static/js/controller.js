/*! 
 *
 * controller.js
 *
 */

// Controls things. Yeah.

$(function () {

	Console.consoleNode = $("#console");
	
})

// Different scenes
Scene = {MENU : 0, FIGHT : 1, ENEMYCHOICE : 2, HISTORY : 3, MONSTERS : 4}

/*
 * Controller Object
 *
 * Represents the Controller of the Client-Side app.
 * 
 */
Controller = {

	// Starting scene
	scene: Scene.MENU,
	
	changeScene: function(scene) {
		Console.hide();
		this.scene = scene;
		
		switch(scene)
		{
			case Scene.MENU:
				Network.getCurrentFight(
					function (data) {
						// TODO : Recevoir l'oid
						var result = $.getJSON("../temp/fightInfos.json");
						alert(result);
						drawMenu(result);
					}
				);
			break;
			
			case Scene.FIGHT:
				Console.show();
				Network.getFightInfos(
					function(data) {
						// TODO : Recevoir plein de data, les traiter et le repasser pour draw des jolis trucs !
						var result = data;
						drawFight(result);
					}
				);
			break;
			
			case Scene.ENEMYCHOICE:
				Facebook.getFriends(
					function (data) {
						var ids=[];
						
						for(var i=0, len=data.friends.length; i<len; i++) {
							ids[i] = data.friends[i].id
						}
						
						Network.getAvailableFriends(ids, function (data) {
							// TODO : Give arguments to drawEnemyChoice
							drawEnemyChoice(data);
						})
					}
				);
				drawEnemyChoice();
			break;
			
			case Scene.HISTORY:
				Network.getMatchHistory(
					function (data) {
						// TODO : Give arguments to drawHistory
						var result = data;
						drawHistory(result);
					}
				);
			break;
			
			case Scene.MONSTERS:
				Network.getMyMonsters(
					function (data) {
						// TODO : Give arguments to drawMonsters
						var result  = data;
						drawMonsters(result);
					}
				);
				drawMonsters();
			break;
		}
	}
	
	
}



/*
 * Console Object
 *
 * Represents the Console during a fight. Used to show messages
 * 
 */
Console = {
	hide: function () {
		this.consoleNode.hide();
	},

	show: function () {
		this.consoleNode.show();
	},

	archieveMessage: function (msg) {
		var html = msg + "<br>";
		this.consoleNode.html(this.consoleNode.html() + html);
		this.consoleNode.scrollTop(this.consoleNode[0].scrollHeight);
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