// エンジンを初期化
var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-1000, -1000);
worldAABB.maxVertex.Set(1000, 1000);
var gravity = new b2Vec2(0, 300);
var doSleep = true;
var world = new b2World(worldAABB, gravity, doSleep);

// 大きい錘
var bigCircleSd = new b2CircleDef();
bigCircleSd.density = 1.0;
bigCircleSd.radius = 30.0;
var bigCircleBd = new b2BodyDef();
bigCircleBd.AddShape(bigCircleSd);
bigCircleBd.position.Set(200, 200);
var bigCircle = world.CreateBody(bigCircleBd)

// 小さい錘
var smallCircleSd = new b2CircleDef();
smallCircleSd.density = 1.0;
smallCircleSd.radius = 10.0;
var smallCircleBd = new b2BodyDef();
smallCircleBd.AddShape(smallCircleSd);
smallCircleBd.position.Set(300, 200);
var smallCircle = world.CreateBody(smallCircleBd)

// ジョイント
var bigCenter = bigCircle.GetCenterPosition();
var smallCenter = smallCircle.GetCenterPosition();
var jd = new b2PulleyJointDef();
jd.body1 = bigCircle;
jd.body2 = smallCircle;
jd.anchorPoint1 = bigCenter;
jd.anchorPoint2 = smallCenter;
jd.groundPoint1.Set(bigCenter.x, bigCenter.y - 100);
jd.groundPoint2.Set(smallCenter.x, smallCenter.y - 100);
jd.maxLength1 = 200;
jd.maxLength2 = 200;
var joint = world.CreateJoint(jd);
