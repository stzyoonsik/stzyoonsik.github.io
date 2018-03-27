/**
 *
 */
function InGameUI () {
	
}

var ui;
var gameOver;
var btnAgain;
function createUI() {
	var style = { font: "30px Arial", fill: "#ffffff", wordWrap: true, align: "center" };
	ui = game.add.text(200, 400, "0", style);
	
	style = { font: "50px Arial", fill: "#ff0000", wordWrap: true, align: "center" };
	gameOver = game.add.text(150, 150, "GAME OVER", style);
	gameOver.alpha = 0.5;
	gameOver.visible = false;
	
	btnAgain = game.add.button(280, 400, "IMG_Again", onInputDownBtnAgain, this, 0, 1, 2, 3);
//	btnAgain.onInputDown.add
}

function whenGameOver() {
	gameOver.visible = true;
}

function onInputDownBtnAgain() {
	gameOver.visible = false;
	
	refresh();
}