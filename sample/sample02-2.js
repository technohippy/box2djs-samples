// エンジンを初期化
var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-1000, -1000);
worldAABB.maxVertex.Set(1000, 1000);
var gravity = new b2Vec2(0, 300);
var doSleep = true;
var world = new b2World(worldAABB, gravity, doSleep);

// 支点
var pivotSd = new b2PolyDef();
pivotSd.vertices = [
  new b2Vec2(0, -50),
  new b2Vec2(25, 0),
  new b2Vec2(-25, 0)
];
pivotSd.vertexCount = pivotSd.vertices.length;
var pivotBd = new b2BodyDef();
pivotBd.position.Set(200, 300);
pivotBd.AddShape(pivotSd);
var pivot = world.CreateBody(pivotBd);

// シーソー
var seesawSd = new b2BoxDef();
seesawSd.density = 1.0;
seesawSd.extents.Set(150, 5);
var seesawBd = new b2BodyDef();
seesawBd.AddShape(seesawSd);
seesawBd.position.Set(200, 245);
var seesaw = world.CreateBody(seesawBd);

// 右の重し
var rightSd1 = new b2BoxDef();
rightSd1.density = 1.0;
rightSd1.extents.Set(30, 30);
var rightSd2 = new b2BoxDef();
rightSd2.density = 1.0;
rightSd2.extents.Set(10, 10);
var rightBd = new b2BodyDef();
rightBd.AddShape(rightSd1);
rightBd.AddShape(rightSd2);
rightBd.position.Set(70, 210);
var right = world.CreateBody(rightBd);

// 左の重し
var leftSd1 = new b2BoxDef();
leftSd1.density = 1.0;
leftSd1.extents.Set(30, 30);
var leftSd2 = new b2BoxDef();
leftSd2.density = 1.0;
leftSd2.extents.Set(10, 10);
leftSd2.localPosition.Set(0, -40);
var leftBd = new b2BodyDef();
leftBd.AddShape(leftSd1);
leftBd.AddShape(leftSd2);
leftBd.position.Set(330, 210);
var left = world.CreateBody(leftBd);
