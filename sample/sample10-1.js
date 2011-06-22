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
boxSd.extents.Set(50, 50);
var boxBd = new b2BodyDef();
boxBd.AddShape(boxSd);
boxBd.position.Set(250, 250);
var box = world.CreateBody(boxBd);

// ジョイントを作成
var jd = new b2RevoluteJointDef();
jd.body1 = world.GetGroundBody();
jd.body2 = box;
jd.anchorPoint = box.GetCenterPosition();
jd.enableLimit = true;
jd.lowerAngle = 1.75 * Math.PI;
//jd.enableMotor = true;
//jd.motorTorque = 100000000;
//jd.motorSpeed = 0;
var joint = world.CreateJoint(jd);
