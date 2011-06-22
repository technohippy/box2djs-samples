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
boxSd.extents.Set(10, 50);
var boxBd = new b2BodyDef();
boxBd.AddShape(boxSd);
boxBd.position.Set(250, 100);
var box1 = world.CreateBody(boxBd);

boxBd.position.Set(250, 200);
var box2 = world.CreateBody(boxBd);

// ジョイントを作成
var jd = new b2RevoluteJointDef();
jd.body1 = world.GetGroundBody();
jd.body2 = box1;
jd.anchorPoint.Set(250, 50);
var joint1 = world.CreateJoint(jd);

jd.body1 = box2;
jd.anchorPoint.Set(250, 150);
var joint2 = world.CreateJoint(jd);

// 地面用に固定された四角をエンジンに追加
var groundSd = new b2BoxDef();
groundSd.extents.Set(2000, 50);
groundSd.restitution = 0.2;
var groundBd = new b2BodyDef();
groundBd.AddShape(groundSd);
groundBd.position.Set(-500, 500);
var ground = world.CreateBody(groundBd);

// 一定時間経過後にジョイントを削除
setTimeout(function() {
  world.DestroyJoint(joint1);
}, 3000);

// 一定時間経過後に物体を削除
setTimeout(function() {
  world.DestroyBody(box1);
  world.DestroyJoint(joint2);
}, 6000);
