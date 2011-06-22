// エンジンを初期化
var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-1000, -1000);
worldAABB.maxVertex.Set(1000, 1000);
var gravity = new b2Vec2(0, 300);
var doSleep = true;
var world = new b2World(worldAABB, gravity, doSleep);

// 固定点
var circleSd = new b2CircleDef();
circleSd.radius = 10.0;
var circleBd1 = new b2BodyDef();
circleBd1.AddShape(circleSd);
circleBd1.position.Set(20, 50);
var circle1 = world.CreateBody(circleBd1)

// 落下点
circleSd.density = 1.0;
var circleBd2 = new b2BodyDef();
circleBd2.AddShape(circleSd);
circleBd2.position.Set(50, 80);
var circle2 = world.CreateBody(circleBd2)

// ジョイント
var jd = new b2PrismaticJointDef();
jd.body1 = circle1;
jd.body2 = circle2;
jd.anchorPoint = circle1.GetCenterPosition();
jd.axis.Set(1.0, 1.0);
jd.lowerTranslation = 500;
jd.upperTranslation = 600;
jd.enableLimit = true;
var joint = world.CreateJoint(jd);
