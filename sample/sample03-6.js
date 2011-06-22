// エンジンを初期化
var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-1000, -1000);
worldAABB.maxVertex.Set(1000, 1000);
var gravity = new b2Vec2(0, 300);
var doSleep = true;
var world = new b2World(worldAABB, gravity, doSleep);

// 歯車1
var circleSd = new b2CircleDef();
circleSd.density = 1.0;
circleSd.radius = 30.0;
var circleBd1 = new b2BodyDef();
circleBd1.AddShape(circleSd);
circleBd1.position.Set(220, 100);
var circle1 = world.CreateBody(circleBd1)

// 歯車2
var circleBd2 = new b2BodyDef();
circleBd2.AddShape(circleSd);
circleBd2.position.Set(circleBd1.position.x - circleSd.radius * 2, 100);
var circle2 = world.CreateBody(circleBd2)

// 直線歯車
var boxSd = new b2BoxDef();
boxSd.density = 1.0;
boxSd.extents.Set(5, 220);
var boxBd = new b2BodyDef();
boxBd.AddShape(boxSd);
boxBd.position.Set(circleBd1.position.x + circleSd.radius + boxSd.extents.x, 
  circleBd1.position.y);
var box = world.CreateBody(boxBd)

// 回転ジョイント1
var rjd1 = new b2RevoluteJointDef();
rjd1.body1 = world.GetGroundBody();
rjd1.body2 = circle1;
rjd1.anchorPoint = circle1.GetCenterPosition();
var revoluteJoint1 = world.CreateJoint(rjd1);

// 回転ジョイント2
var rjd2 = new b2RevoluteJointDef();
rjd2.body1 = world.GetGroundBody();
rjd2.body2 = circle2;
rjd2.anchorPoint = circle2.GetCenterPosition();
var revoluteJoint2 = world.CreateJoint(rjd2);

// 角度ジョイント
var pjd = new b2PrismaticJointDef();
pjd.body1 = world.GetGroundBody();
pjd.body2 = box;
pjd.anchorPoint.Set(boxBd.position.x, 100);
pjd.axis.Set(0, 1);
var prismaticJoint = world.CreateJoint(pjd);

// ギアジョイント1（回転ジョイントと回転ジョイント）
var jd1 = new b2GearJointDef();
jd1.body1 = circle1;
jd1.body2 = circle2;
jd1.joint1 = revoluteJoint1;
jd1.joint2 = revoluteJoint2;
var gearJoint1 = world.CreateJoint(jd1);

// ギアジョイント2（回転ジョイントと角度ジョイント）
var jd2 = new b2GearJointDef();
jd2.body1 = circle1;
jd2.body2 = box;
jd2.joint1 = revoluteJoint1;
jd2.joint2 = prismaticJoint;
jd2.ratio = -2 * Math.PI / circleSd.radius;
var gearJoint2 = world.CreateJoint(jd2);
