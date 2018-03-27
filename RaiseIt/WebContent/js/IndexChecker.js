/**
 *
 */
function IndexChecker () {
	
}

var EDirection = {
	UP : 0,
	RIGHT_UP : 1,
	RIGHT : 2,
	RIGHT_DOWN : 3,
	DOWN : 4,
	LEFT_DOWN : 5,
	LEFT : 6,
	LEFT_UP : 7
};

function getDirection(inSrcIndex, inDestIndex) {
	//↑
	if(inSrcIndex - EBoard.ROWS == inDestIndex) {
		return EDirection.UP;
	}
	//↗
	else if(inSrcIndex - EBoard.ROWS + 1 == inDestIndex) {
		return EDirection.RIGHT_UP;
	}
	//→
	else if(inSrcIndex + 1 == inDestIndex) {
		return EDirection.RIGHT;
	}
	//↘
	else if(inSrcIndex + EBoard.ROWS + 1 == inDestIndex) {
		return EDirection.RIGHT_DOWN;
	}
	//↓
	else if(inSrcIndex + EBoard.ROWS == inDestIndex) {
		return EDirection.DOWN;
	}
	//↙
	else if(inSrcIndex + EBoard.ROWS - 1 == inDestIndex) {
		return EDirection.LEFT_DOWN;
	}
	//←
	else if(inSrcIndex - 1 == inDestIndex) {
		return EDirection.LEFT;
	}
	//↖
	else if(inSrcIndex - EBoard.ROWS - 1 == inDestIndex) {
		return EDirection.LEFT_UP;
	}
	
	return -1;
}

function getOppositeDirection(inSrcIndex, inDestIndex) {
	var direction = getDirection(inSrcIndex, inDestIndex) + 4;		
	return direction >= 8 ? direction - 8 : direction;
}

function getIndicesByDirection(inIndex, inDirection) {
	var indices = [];
	var count = 0;
	var lastIndex = inIndex;
	
	indices[count++] = inIndex;
	//여기 무한루프
	while(true) {
		lastIndex = getIndexByDirection(lastIndex, inDirection);
		if(lastIndex != -1) {
			indices[count++] = lastIndex;
		}
		else {
			break;
		}
	}
	
	return indices;
}

function getIndexByDirection(inIndex, inDirection) {
	switch(inDirection){
		case EDirection.UP :
			if(!isTopSide(inIndex)) {
				return inIndex - EBoard.ROWS;
			}
			break;
		case EDirection.RIGHT_UP :
			if(!isTopSide(inIndex) && !isRightSide(inIndex)) {
				return inIndex - EBoard.ROWS + 1;
			}
			break;
		case EDirection.RIGHT :
			if(!isRightSide(inIndex)) {
				return inIndex + 1;
			}
			break;
		case EDirection.RIGHT_DOWN :
			if(!isRightSide(inIndex) && !isBottomSide(inIndex)) {
				return inIndex + EBoard.ROWS + 1;
			}
			break;
		case EDirection.DOWN :
			if(!isBottomSide(inIndex)) {
				return inIndex + EBoard.ROWS;
			}
			break;
		case EDirection.LEFT_DOWN :
			if(!isBottomSide(inIndex) && !isLeftSide(inIndex)) {
				return inIndex + EBoard.ROWS - 1;
			}
			break;
		case EDirection.LEFT :
			if(!isLeftSide(inIndex)) {
				return inIndex - 1;
			}
			break;
		case EDirection.LEFT_UP :
			if(!isLeftSide(inIndex) && !isTopSide(inIndex)) {
				return inIndex - EBoard.ROWS - 1;
			}
			break;
	}
	
	return -1;
}

//8방향 주변 인덱스 체크
function isNearIndex(inSrcIndex, inDestIndex) {
	//↑
	if(inSrcIndex - EBoard.ROWS == inDestIndex) {
		return !isTopSide(inSrcIndex);
	}
	//↗
	else if(inSrcIndex - EBoard.ROWS + 1 == inDestIndex) {
		return !isTopSide(inSrcIndex) && !isRightSide(inSrcIndex);
	}
	//→
	else if(inSrcIndex + 1 == inDestIndex) {
		return !isRightSide(inSrcIndex);
	}
	//↘
	else if(inSrcIndex + EBoard.ROWS + 1 == inDestIndex) {
		return !isBottomSide(inSrcIndex) && !isRightSide(inSrcIndex);
	}
	//↓
	else if(inSrcIndex + EBoard.ROWS == inDestIndex) {
		return !isBottomSide(inSrcIndex);
	}
	//↙
	else if(inSrcIndex + EBoard.ROWS - 1 == inDestIndex) {
		return !isBottomSide(inSrcIndex) && !isLeftSide(inSrcIndex);
	}
	//←
	else if(inSrcIndex - 1 == inDestIndex) {
		return !isLeftSide(inSrcIndex);
	}
	//↖
	else if(inSrcIndex - EBoard.ROWS - 1 == inDestIndex) {
		return !isTopSide(inSrcIndex) && !isLeftSide(inSrcIndex);
	}	
	
	return false;
}

//가장자리 인덱스 체크
function isSideIndex(inIndex){
	
}

function isTopSide(inIndex){	
	return Math.floor(inIndex / EBoard.COLS) == 0;
}

function isBottomSide(inIndex){
	return Math.floor(inIndex / EBoard.COLS) == EBoard.COLS - 1;
}

function isLeftSide(inIndex){
	return inIndex % EBoard.ROWS == 0;
}

function isRightSide(inIndex){
	return inIndex % EBoard.ROWS == EBoard.ROWS - 1;
}

function getAroundIndices(inIndex) {	
	var indices = [];	
	
	for(var i = 0; i < 8; ++i) {
		var index = getIndexByDirection(inIndex, i);		
		if(index != -1) {
			indices.push(index);
		}
	}
	
	return indices;
}

function getPositionByIndex(inIndex) {
	
	var pos = {x : (inIndex % EBoard.COLS) * EBlock.WIDTH + (EBlock.WIDTH / 2), 
			   y : Math.floor(inIndex / EBoard.ROWS) * EBlock.HEIGHT + (EBlock.HEIGHT / 2)};
	
	return pos;
}