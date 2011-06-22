// エンジンを初期化
var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-1000, -1000);
worldAABB.maxVertex.Set(1000, 1000);
var gravity = new b2Vec2(0, 300);
var doSleep = true;
var world = new b2World(worldAABB, gravity, doSleep);

// 図形を定義してエンジンに追加
var rightPolySd = new b2PolyDef();
rightPolySd.density = 1.0;
rightPolySd.vertices = [
  new b2Vec2(40, -40),
  new b2Vec2(40, 20),
  new b2Vec2(1, 0),
  new b2Vec2(1, -40)
];
rightPolySd.vertexCount = rightPolySd.vertices.length;
var leftPolySd = new b2PolyDef();
leftPolySd.density = 1.0;
leftPolySd.vertices = [
  new b2Vec2(1, -40),
  new b2Vec2(1, 0),
  new b2Vec2(-40, 20),
  new b2Vec2(-40, -40)
];
leftPolySd.vertexCount = leftPolySd.vertices.length;
var bd = new b2BodyDef();
bd.AddShape(rightPolySd);
bd.AddShape(leftPolySd);
bd.position.Set(250, 100);
var body = world.CreateBody(bd)

// 地面用に固定された四角をエンジンに追加
var groundSd = new b2BoxDef();
groundSd.extents.Set(2000, 50);
groundSd.restitution = 0.2;
var groundBd = new b2BodyDef();
groundBd.AddShape(groundSd);
groundBd.position.Set(-500, 500);
var ground = world.CreateBody(groundBd);
