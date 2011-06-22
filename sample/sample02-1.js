// エンジンを初期化
var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-1000, -1000);
worldAABB.maxVertex.Set(1000, 1000);
var gravity = new b2Vec2(0, 300);
var doSleep = true;
var world = new b2World(worldAABB, gravity, doSleep);

// 図形を定義してエンジンに追加
var leftSd = new b2CircleDef();
leftSd.density = 1.0;
leftSd.radius = 30;
leftSd.localPosition.Set(-40, -40);
var rightSd = new b2CircleDef();
rightSd.density = 1.0;
rightSd.radius = 20;
rightSd.localPosition.Set(40, 40);
var bd = new b2BodyDef();
bd.AddShape(leftSd);
bd.AddShape(rightSd);
bd.position.Set(250, 100);
var body = world.CreateBody(bd);

var pinSd = new b2CircleDef();
pinSd.radius = 5;
var pinBd = new b2BodyDef();
pinBd.AddShape(pinSd);
pinBd.position.Set(250, 380);
var pin = world.CreateBody(pinBd);

// 地面用に固定された四角をエンジンに追加
var groundSd = new b2BoxDef();
groundSd.extents.Set(2000, 50);
groundSd.restitution = 0.2;
var groundBd = new b2BodyDef();
groundBd.AddShape(groundSd);
groundBd.position.Set(-500, 500);
var ground = world.CreateBody(groundBd);
