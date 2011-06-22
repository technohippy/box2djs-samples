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

// 前輪と後輪の距離を固定
var jd = new b2DistanceJointDef();
jd.body1 = frontWheel;
jd.body2 = backWheel;
jd.anchorPoint1.Set(170, 50);
jd.anchorPoint2.Set(30, 50);
var joint = world.CreateJoint(jd);

// 地面用に固定された四角をエンジンに追加
var groundSd = new b2BoxDef();
groundSd.extents.Set(2000, 50);
groundSd.restitution = 0.2;
groundSd.localRotation = 0.1;
var groundBd = new b2BodyDef();
groundBd.AddShape(groundSd);
groundBd.position.Set(-500, 400);
var ground = world.CreateBody(groundBd);
