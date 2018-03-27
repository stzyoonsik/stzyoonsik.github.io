/**
 *
 */
function InGame () {
	
}

var blocks;
var blockList;
var allowInput; //트위닝하는동안 입력을 막을 변수		

var bg;
var current;    //현재 위치를 나타냄	
var currentIndex;
var point = 0;

function loadResource() {
	bg = game.add.graphics(0,0);
	
	bg.beginFill(0xFFFFFF);
	bg.drawRect(0,0,320,320);
	bg.endFill();
	
	bg.anchor.set(0.5);
	bg.x = 50;
	bg.y = 50;
	
	game.load.image("Tile_Circle_Blue", "assets/images/Tile_Circle_Blue.png");
	game.load.image("Tile_Circle_Green", "assets/images/Tile_Circle_Green.png");
	game.load.image("Tile_Circle_Yellow", "assets/images/Tile_Circle_Yellow.png");
	game.load.image("Tile_Oct_Blue", "assets/images/Tile_Oct_Blue.png");
	game.load.image("Tile_Oct_Green", "assets/images/Tile_Oct_Green.png");
	game.load.image("Tile_Oct_Yellow", "assets/images/Tile_Oct_Yellow.png");
	game.load.image("Tile_Rect_Blue", "assets/images/Tile_Rect_Blue.png");
	game.load.image("Tile_Rect_Green", "assets/images/Tile_Rect_Green.png");
	game.load.image("Tile_Rect_Yellow", "assets/images/Tile_Rect_Yellow.png");
	game.load.image("Tile_Blocked", "assets/images/Tile_Blocked.png");
	
	game.load.image("IMG_Again", "assets/images/IMG_Again.png");
	
	images = [["Tile_Circle_Blue", "Tile_Circle_Green", "Tile_Circle_Yellow"],
				["Tile_Oct_Blue", "Tile_Oct_Green", "Tile_Oct_Yellow"],
				["Tile_Rect_Blue", "Tile_Rect_Green", "Tile_Rect_Yellow"]];
}

function spawnBlocks() {
	blocks = game.add.group();
	blockList = [];
	
	var nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
	
	for (var i = 0; i < EBoard.COLS; ++i)
    {
        for (var j = 0; j < EBoard.ROWS; ++j)
    	{        
        	var rndIndex = game.rnd.integerInRange(0, nums.length - 1);
        	var num = nums.splice(rndIndex, 1)[0];
        	
        	var block = createBlock((i * EBoard.COLS) + j, num);
        	bg.addChild(block);
        	
        	blockList[(i * EBoard.COLS) + j] = block;
    	}
    }
	
	swap(getBlockByNum(1), getBlockByIndex(12));
	
	setCurrent(blockList[12]);
	currentIndex = 12;
}

function createBlock(inIndex, inNum) {
	var position = getPositionByIndex(inIndex);
	var s = game.rnd.integerInRange(EShape.CIRCLE, EShape.RECT);
	var c = game.rnd.integerInRange(EColor.BLUE, EColor.YELLOW);
	var block = game.add.sprite(position.x, position.y, images[s][c]);
	      	        	
	block.anchor.set(0.5);
	
	block.shape = s;
	block.color = c;
	block.index = inIndex;
	block.num = inNum;
	block.isBlocked = false;
	
	block.inputEnabled = true;
	block.events.onInputDown.add(onSelected, this);
	block.events.onInputUp.add(onReleased, this);
	block.events.onInputOver.add(onInputOver, this);
	block.events.onInputOut.add(onInputOut, this);
	
	var style = { font: "25px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: block.width, align: "center" };
	var text = game.add.text(0,0, block.num, style);
	text.anchor.set(0.5);
	
	block.text = text;
	
	block.addChild(text);
	
	return block;
}

//블록을 블록시킴
function block(inBlock) {
	console.log(inBlock.index + "블록시킴");
	
	inBlock.loadTexture("Tile_Blocked");
	inBlock.isBlocked = true;
	inBlock.text.text = "";
	
//	block.events.onInputDown.removeAll();
//	block.events.onInputUp.removeAll();
//	block.events.onInputOver.removeAll();
//	block.events.onInputOut.removeAll();
}

function allocate() {
	for(var i = 0; i < blockList.length; ++i) {
		var srcIndex = game.rnd.integerInRange(0, blockList.length - 1);
		var destIndex = game.rnd.integerInRange(0, blockList.length - 1);
		
		swap(blockList[srcIndex], blockList[destIndex]);
	}		
	
	swap(getBlockByNum(1), getBlockByIndex(12));
	
//	console.log(blockList);
}

function setCurrent(inBlock) {
	if(current != null) {
		bg.removeChild(current);
		current.kill();
	}	
	
	current = game.add.graphics();	
	current.beginFill(0xFF0000);
	current.drawRect(inBlock.x - (EBlock.WIDTH / 2), inBlock.y - (EBlock.HEIGHT / 2), EBlock.WIDTH, EBlock.HEIGHT);
	current.endFill();
	
	bg.addChildAt(current, 0);
	
	currentIndex = inBlock.index;
	
//	console.log("currentIndex : " + currentIndex + " ,currentNum : " + inBlock.num);
}

function getBlockByIndex(inIndex) {
	for(var i = 0; i < blockList.length; ++i) {
		if(blockList[i].index == inIndex) {			
			return blockList[i];
		}
	}
	
	return -1;
}

function getBlockByNum(inNum) {
	for(var i = 0; i < blockList.length; ++i) {
		if(blockList[i].num == inNum) {			
			return blockList[i];
		}
	}
	
	return -1;
}

//두 블록의 좌표와 인덱스를 스왑
function swap(inSrcBlock, inDestBlock) {
	if(inSrcBlock.index == inDestBlock.index) {
		return;
	}
	
	var temp = {x : inDestBlock.x,
				y : inDestBlock.y,
				index : inDestBlock.index};
	var tempBlock = blockList[inDestBlock.index];
	
	blockList[inDestBlock.index] = inSrcBlock;
	inDestBlock.x = inSrcBlock.x;
	inDestBlock.y = inSrcBlock.y;
	inDestBlock.index = inSrcBlock.index;
	
	blockList[inSrcBlock.index] = tempBlock;
	inSrcBlock.x = temp.x;
	inSrcBlock.y = temp.y;
	inSrcBlock.index = temp.index;
}

function getPoint(inSrcBlock, inDestBlock) {	
	//모양 X 색깔 X
	if(inSrcBlock.shape != inDestBlock.shape && inSrcBlock.color != inDestBlock.color) {
		return 0;
	}
	//모양 X 색깔 O
	else if(inSrcBlock.shape != inDestBlock.shape && inSrcBlock.color == inDestBlock.color) {
		return 2;
	}
	//모양 O 색깔 X
	else if(inSrcBlock.shape == inDestBlock.shape && inSrcBlock.color != inDestBlock.color) {
		return 2;
	}
	//모양 O 색깔 O
	else if(inSrcBlock.shape == inDestBlock.shape && inSrcBlock.color == inDestBlock.color) {
		return 3;
	}
	
	return 0;
}

function getMinNumBlock() {
	var block = blockList[0];	
	for(var i = 1; i < blockList.length; ++i) {
		if(blockList[i] == null || blockList[i].isBlocked == true || blockList[i].index == currentIndex) {
			continue;
		}
		
		if(blockList[i].num < block.num) {
			block = blockList[i];
		}
	}
	
	return block;	
}

function getMaxNum() {
	var max = 0;
	for(var i = 1; i < blockList.length; ++i) {
		if(blockList[i] == null || blockList[i].isBlocked == true) {
			continue;
		}
		
		if(max < blockList[i].num) {
			max = blockList[i].num;
		}
	}
	
	return max;
}

function move(inSrcIndex, inDestIndex) {
	
	var block = blockList[inSrcIndex];
	var destPos = getPositionByIndex(inDestIndex);
	
//	var moveTween = game.add.tween(block);
//	moveTween.to({x : destPos.x, y : destPos.y}, 0.5);
//	moveTween.onComplete.add(onCompleteMove, this);
//	moveTween.start();
	
	
	block.x = destPos.x;
	block.y = destPos.y;
	block.index = inDestIndex;
	
	blockList[inSrcIndex] = null;
	blockList[inDestIndex] = block;
}

//function onCompleteMove() {
//	blockList[inSrcIndex] = null;
//	blockList[inDestIndex] = block;
//}

function removeAllBlock() {
	for(var i = 0; i < blockList.length; ++i) {
		var block = blockList[i];
		
		if(block == null) {
			continue; 
		}		
		
		block.events.onInputDown.removeAll();
		block.events.onInputUp.removeAll();
		block.events.onInputOver.removeAll();
		block.events.onInputOut.removeAll();
		
		block.destroy();
		block = null;
		blockList[i] = null;
	}	
}

function removeBlock(inBlock) {
	blockList[inBlock.index] = null;
	inBlock.destroy();
}

function oneCycleComplete(inPoint) {
	//이동한 반대방향의 블록들의 인덱스
	var direction = getOppositeDirection(_srcBlock.index, _destBlock.index);
	var oppositeIndices = getIndicesByDirection(_srcBlock.index, direction);
	
	//이동 전 블록 제거
	removeBlock(_srcBlock);	
	
	//반대 방향의 블록들 이동
	for(var i = 0; i < oppositeIndices.length - 1; ++i) {
		move(oppositeIndices[i + 1], oppositeIndices[i]);
	}	
	
	//블록 생성	
	var maxNum = getMaxNum();
	console.log("블록 생성 : index : " + oppositeIndices[oppositeIndices.length - 1] + " num : " + maxNum + 1);
	
	var newBlock = createBlock(oppositeIndices[oppositeIndices.length - 1], maxNum + 1);
	bg.addChild(newBlock);
	blockList[newBlock.index] = newBlock;
	
	//획득 포인트만큼 반복하면서 가장 낮은수를 가장 높은수로 변경
	for(var i = 0; i < inPoint; ++i) {
		var block = getMinNumBlock();
		console.log(block.index + " 블록 숫자 변경 : " + block.num + " 에서 " + (maxNum + 2 + i) + " 로");
		block.num = maxNum + 2 + i;
		block.text.text = block.num;
	}
	
//	console.log(blockList);
}

//더 이상 진행할 수 없는지 검사
function checkGameOver() {
	var aroundIndices = getAroundIndices(currentIndex);
	for(var i = 0; i < aroundIndices.length; ++i) {		
		var moveStatus = checkPossibleToMove(blockList[currentIndex], blockList[aroundIndices[i]]);		
		if(moveStatus == EMoveStatus.POSSIBLE || moveStatus == EMoveStatus.POSSIBLE_DESC) {
			return false;
		}
	}	
	return true;
}

function checkPossibleToMove(inSrcBlock, inDestBlock) {	
	if(inDestBlock.isBlocked == true) {
		return EMoveStatus.IMPOSSIBLE;
	}	
	else if(inSrcBlock.num < inDestBlock.num) {
		return EMoveStatus.POSSIBLE;
	}
	else if(inSrcBlock.shape == inDestBlock.shape && inSrcBlock.color == inDestBlock.color) {
		return EMoveStatus.POSSIBLE_DESC;
	}	
	
	return EMoveStatus.IMPOSSIBLE;
}

var newPoint = 0;
function onInput() {
	var moveStatus = checkPossibleToMove(_srcBlock, _destBlock);
	if(moveStatus == EMoveStatus.POSSIBLE) {
		newPoint = getPoint(_srcBlock, _destBlock);
		point += newPoint;
		
		setCurrent(_destBlock);
		if(newPoint == 0) {
			block(_srcBlock);
		}			
		else {
			oneCycleComplete(newPoint);	
		}			
	}
	else if(moveStatus == EMoveStatus.POSSIBLE_DESC) {			
		setCurrent(_destBlock);	
		oneCycleComplete(0);
	}
		
	ui.text = point;
	console.log("point : " + point);	

	if(checkGameOver() == true) {
		console.log("게임오버");
		clear();
		whenGameOver();
	}
}

function clear() {
	blocks.inputEnableChildren = false;
	_srcBlock = null;
	_destBlock = null;
}

var _srcBlock;
var _destBlock;
function onSelected(inBlock) {	
	if(inBlock.index != currentIndex) {
		return;
	}
	
	_srcBlock = inBlock;
	currentIndex = inBlock.index;		
}

function onReleased() {
	
	if(_destBlock == null){
		return;
	}
	
	_destBlock.text.angle = 0;		
	
	if(_srcBlock != null && _destBlock != null) {
//		console.log("src : " + _srcBlock.index, "dest : " + _destBlock.index);
		
		if(isNearIndex(_srcBlock.index, _destBlock.index) == true) {
			onInput();		
		}	
	}
}

function onInputOver(inBlock, inPointer) {
	
	if(inPointer.isDown == true){		
		_destBlock = inBlock;
		
		if(_srcBlock != null && isNearIndex(_srcBlock.index, _destBlock.index) == true) {
			inBlock.text.angle = 45;
		}	
	}
	else{
		inBlock.text.angle = 0;
	}
}

function onInputOut(inBlock) {
	inBlock.text.angle = 0;
}
