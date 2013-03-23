/*! 
 *
 * controller.js
 *
 */

// Controls things. Yeah.

var consoleNode = $("#console");

function console(msg) {
	var html = "<p>" + msg + "</p>";
	consoleNode.html = html + consoleNode.html;
}