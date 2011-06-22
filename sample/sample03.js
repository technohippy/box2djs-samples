// エンジンを初期化
var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-1000, -1000);
worldAABB.maxVertex.Set(1000, 1000);
var gravity = new b2Vec2(0, 300);
var doSleep = true;
var world = new b2World(worldAABB, gravity, doSleep);

// 前輪
var wheelSd = new b2CircleDef();
wheelSd.density = 1.0;
wheelSd.radius = 30;
var wheelBd = new b2BodyDef();
wheelBd.AddShape(wheelSd);
wheelBd.position.Set(50, 50);
var backWheel = world.CreateBody(wheelBd);

// 後輪
wheelBd.position.Set(150, 50);
var frontWheel = world.CreateBody(wheelBd);

// 車体
var carSd = new b2BoxDef();
carSd.density = 1.0;
carSd.extents.Set(60, 10);
var carBd = new b2BodyDef();
carBd.AddShape(carSd);
carBd.position.Set(100, 50);
var car = world.CreateBody(carBd);

// 前輪を車体に固定
var pinJd = new b2RevoluteJointDef();
pinJd.body1 = frontWheel;
pinJd.body2 = car;
pinJd.anchorPoint = frontWheel.GetCenterPosition();
var frontPin = world.CreateJoint(pinJd);

// 後輪を車体に固定
pinJd.body1 = backWheel;
pinJd.anchorPoint = backWheel.GetCenterPosition();
var backPin = world.CreateJoint(pinJd);

// 地面用に固定された四角をエンジンに追加
var groundSd = new b2BoxDef();
groundSd.extents.Set(2000, 50);
groundSd.restitution = 0.2;
groundSd.localRotation = 0.1;
var groundBd = new b2BodyDef();
groundBd.AddShape(groundSd);
groundBd.position.Set(-500, 400);
var ground = world.CreateBody(groundBd);
