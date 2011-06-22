// エンジンを初期化
var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-1000, -1000);
worldAABB.maxVertex.Set(1000, 1000);
var gravity = new b2Vec2(0, 300);
var doSleep = true;
var world = new b2World(worldAABB, gravity, doSleep);

// 物体を作成
var boxSd = new b2BoxDef();
boxSd.density = 1.0;
boxSd.extents.Set(30, 30);
var boxBd = new b2BodyDef();
boxBd.AddShape(boxSd);
boxBd.position.Set(250, 200+220);
var box = world.CreateBody(boxBd);

// 地面用に固定された四角をエンジンに追加
var groundSd = new b2BoxDef();
groundSd.extents.Set(2000, 50);
groundSd.restitution = 0.2;
var groundBd = new b2BodyDef();
groundBd.AddShape(groundSd);
groundBd.position.Set(-500, 500);
var ground = world.CreateBody(groundBd);

// 物体の中心に上向きの衝撃を加える
setTimeout(function() {
  box.WakeUp();
  var position = box.GetCenterPosition().Copy();
  box.ApplyImpulse(new b2Vec2(0, -1500000), position);
}, 1500);
