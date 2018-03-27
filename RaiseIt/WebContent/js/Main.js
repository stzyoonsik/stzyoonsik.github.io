window.onload = function() {
	startGame();
};

var game;

function startGame() {
	game = new Phaser.Game(800, 600, Phaser.AUTO, 'test', {preload : preload, create : create});
}

function preload() {
	loadResource();
}

function create() {
	createUI();
	spawnBlocks();
	
	allowInput = true;	
}



//게임 초기화
function refresh() {
	removeAllBlock();
	spawnBlocks();
	
	point = 0;
	ui.text = point;
}


