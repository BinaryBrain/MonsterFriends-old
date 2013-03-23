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
Scene = {MENU : 0, FIGHT : 1, EVOLUTION : 2, ENEMYCHOICE : 3, HISTORY : 4, MONSTERS : 5}

/*
 * Controller Object
 *
 * Represents the Controller of the Client-Side app.
 * 
 */
Controller = {

	// Starting scene
	scene: Scene.MENU,
	
	changeScene: function(scene, data) {
		Console.hide();
		this.scene = scene;
		
		switch(scene)
		{
			case Scene.MENU:
				drawMenu(data.oid);
			break;
			
			case Scene.FIGHT:
				Console.show();
				drawFight();
			break;
			
			case Scene.EVOLUTION:
				drawEvolution();
			break;
			
			case Scene.ENEMYCHOICE:
				Network.askFight(
					function (eid, data) {
						// TODO : Give arguments to drawEnemyChoice
						var result = data;
						drawEnemyChoice(eid, data);
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