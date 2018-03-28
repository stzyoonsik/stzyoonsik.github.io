/**
 * "id" : 스테이지 고유 번호
	"shape" 형태, x, y, radius, points (point는 12시방향부터 length 만큼 생성)
	"fruit" : & 기준 좌우의 shape인덱스:point인덱스를 이어놓은채로 시작   
	"move" : 남은 이동
	"mission" : - 기준으로 두 색상을 교차시키면 미션 성공  (스테이지내에서 교차되는 직선이 오직 미션에 해당해야함)
 *
 */
function StageData () {
	
}

var stageDatas = {};
function parseStageData() {
	var stageData = game.cache.getText("stageData");
	stageData = JSON.parse(stageData);
	
	if(stageData == null) {
		return;
	}
	
	for(var key in stageData) {
		stageDatas[key] = stageData[key];
	}	
	
//	console.log(stageDatas[1]);
	console.log(stageDatas);
}