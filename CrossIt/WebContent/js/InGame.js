/**
 *
 */
function InGame () {
	
}

var shapes;

function loadResource() {
	game.load.image("block_red", "assets/images/block_red.png");
	game.load.image("block_yellow", "assets/images/block_yellow.png");
	game.load.image("block_green", "assets/images/block_green.png");
	game.load.image("block_blue", "assets/images/block_blue.png");
	game.load.image("block_purple", "assets/images/block_purple.png");
	game.load.image("block_gray", "assets/images/block_gray.png");
	
	game.load.text("stageData", "assets/stages/stageData.json");
}

//
function spawnBlock(inStageData) {
	drawShape(inStageData);
}

//스테이지 원과 인덱스를 그림
function drawShape(inStageData) {
	shapes = getShapeDatas(inStageData.shape);
	console.log(shapes);
	
	var graphic = game.add.graphics(0,0);
	
	graphic.lineStyle(2, 0xFFFFFF, 1);
	
	for(var i = 0; i < shapes.length; ++i) {
		var shape = shapes[i];
		
		graphic.drawCircle(shape.origin.x, shape.origin.y, shape.radius * 2);
		
		graphic.beginFill();
		for(var j = 0; j < shape.indices.length; ++j) {			
			graphic.drawCircle( shape.indices[j].x,  shape.indices[j].y, 10);			
		}
		graphic.endFill();
	}	
}

//stageData.json의 shape 정보를 가공하여 리턴
function getShapeDatas(inShapeDatas) {
	if(inShapeDatas == null) {
		return null;
	}
	
	var shapeDatas = [];
	for(var i = 0; i < inShapeDatas.length; ++i) {
		if(inShapeDatas[i][0] == EShapeType.CIRCLE) {
			shapeDatas.push(getCircleData(inShapeDatas[i]));
		}
		else if(inShapeDatas[i][0] == EShapeType.RECT) {
			//TODO
		}
	}	
	
	return shapeDatas;
}

function getCircleData(inShape) {
	var circle = {};
	
	var indices = [];
	
	var origin = { x : inShape[1], y : inShape[2] };	//원점
	var radius = inShape[3];							//반지름
	var length = inShape[4];							//점 갯수
	var theta  = 360 / length;							//세타 각
	
	console.log("origin : " + origin.x, origin.y);
	console.log("radius : " + radius);
	console.log("length : " + length);
	console.log("theta : " + theta);
	
	for(var i = 0; i < length; ++i){
		var point = {};
		point.x = origin.x + (radius * Math.sin((theta * i) * Math.PI / 180));
		point.y = origin.y - (radius * Math.cos((theta * i) * Math.PI / 180));
		
		indices.push(point);
		
	}
	
	circle.type = EShapeType.CIRCLE;
	circle.origin = origin;
	circle.radius = radius;
	circle.indices = indices;
	
	return circle;
}



