window.onload = function() {
	startGame();
};

var game;

function startGame() {
	console.log("client version : " + CLIENT_VERSION);
	game = new Phaser.Game(800, 600, Phaser.AUTO, 'test', {preload : preload, create : create});
}

function preload() {
	loadResource();	
}

function create() {
	parseStageData();
	spawnBlock(stageDatas[1]);
	
}