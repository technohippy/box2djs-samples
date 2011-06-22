var ChangeColor = true;
var ShouldClear = false;
var Color = 100;
var DColor = 2;
var Skip = 0;
var Interval = 8;
var StepTime = 100;
var TimeStep = 1.0/60;

window.onload = function() {
  // 表示用のコンテキストを取得
  var context = $$('canvas')[0].getContext('2d');

  // エンジンのプロパティ
  var timeStep = TimeStep;
  var iteration = 1;

  // アニメーションを実行
  // （10ms毎に画面を書き換える）
  setInterval(function() {
    // 表示をクリア
    if (ShouldClear) context.clearRect(0, 0, 500, 500);
    if (ChangeColor) Color += DColor;
    // 物体を次の位置へ移動
	world.Step(timeStep, iteration);
    // 物体を表示
    if (Interval < Skip) {
      drawWorld(world, context);
      Skip = 0;
    } 
    else { Skip++; }
  }, StepTime);
}
