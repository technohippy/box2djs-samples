/***** b2Worldを設定 *****/
// エンジンを初期化
var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-1000, -1000);
worldAABB.maxVertex.Set(1000, 1000);
var gravity = new b2Vec2(0, 300);
var doSleep = true;
var world = new b2World(worldAABB, gravity, doSleep);

// クラブヘッド
var circleSd = new b2CircleDef();
circleSd.density = 10;
circleSd.radius = 10;
circleSd.restitution = 2;
circleSd.groupIndex = 1;
var clubHeadBd = new b2BodyDef();
clubHeadBd.AddShape(circleSd);
clubHeadBd.position.Set(200, 450 - circleSd.radius);
var clubHead = world.CreateBody(clubHeadBd)
clubHead.userData = 'clubHead';

// ティー
var boxSd = new b2BoxDef();
boxSd.density = 0.5;
boxSd.extents = new b2Vec2(10, 5);
boxSd.friction = 1;
boxSd.categoryBits = 1;  // 0001
boxSd.groupIndex = 1;
var teeBd = new b2BodyDef();
teeBd.AddShape(boxSd);
teeBd.position.Set(220, 450 - boxSd.extents.y);
var tee = world.CreateBody(teeBd);
tee.userData = 'tee';

// ボール
circleSd.density = 1;
circleSd.restitution = 0.2;
circleSd.categoryBits = 2; // 0010
circleSd.maskBits = 5;     // 0101
var ballBd = new b2BodyDef();
ballBd.AddShape(circleSd);
ballBd.position.Set(220, 450 - boxSd.extents.y - circleSd.radius - 5);
var ball = world.CreateBody(ballBd);
ball.userData = 'ball';

// クラブ
var clubJd = new b2RevoluteJointDef();
clubJd.body1 = clubHead;
clubJd.body2 = world.GetGroundBody();
clubJd.anchorPoint = new b2Vec2(200, 300);
var club = world.CreateJoint(clubJd);
club.userData = 'club';

// 的
var targetSd = new b2CircleDef();
targetSd.density = 1;
targetSd.radius = 20;
targetSd.categoryBits = 8;  // 1000
targetSd.maskBits = 4;      // 0100
targetSd.groupIndex = 1;
var targetBd = new b2BodyDef();
targetBd.AddShape(targetSd);
targetBd.position.Set(950, 180);
var target = world.CreateBody(targetBd);
target.userData = 'target';

var motorJd = new b2RevoluteJointDef();
motorJd.body1 = target;
motorJd.body2 = world.GetGroundBody();
motorJd.anchorPoint = new b2Vec2(850, 250);
motorJd.enableMotor = true;
motorJd.motorSpeed = 1;
motorJd.motorTorque = 100000000;
var motor = world.CreateJoint(motorJd);

// 地面
var groundSd = new b2BoxDef();
groundSd.extents.Set(2000, 50);
groundSd.restitution = 0.2;
groundSd.groupIndex = 1;
var slopeSd = new b2PolyDef();
slopeSd.vertices = [
  new b2Vec2(900 + 500, 450 - 500),
  new b2Vec2(500 + 500, 450 - 500), 
  new b2Vec2(700 + 500, 400 - 500)
];
slopeSd.vertexCount = slopeSd.vertices.length;
slopeSd.restitution = 1.5;
slopeSd.groupIndex = 1;
var groundBd = new b2BodyDef();
groundBd.AddShape(groundSd);
groundBd.AddShape(slopeSd);
groundBd.position.Set(-500, 500);
var ground = world.CreateBody(groundBd);
ground.userData = 'ground';

/***** 衝突を処理 *****/
function handleContacts(w) {
  // ターゲットにヒット
  function hit(b) {
    var center = b.GetCenterPosition();
    // ターゲットを削除
    w.DestroyBody(b);

    // ターゲットの破片を作成
    var pieceSd1 = new b2PolyDef();
    pieceSd1.density = 1;
    pieceSd1.vertices = [
      new b2Vec2(10,   0),
      new b2Vec2( 0,  5),
      new b2Vec2( 0, -5)
    ];
    pieceSd1.vertexCount = pieceSd1.vertices.length;
    pieceSd1.categoryBits = 8;  // 1000
    pieceSd1.maskBits = 9;      // 1001
    pieceSd1.groupIndex = 1;
    var pieceSd2 = new b2PolyDef();
    pieceSd2.density = 1;
    pieceSd2.vertices = [
      new b2Vec2( 7,  5),
      new b2Vec2(-3,   0),
      new b2Vec2( 7, -5)
    ];
    pieceSd2.vertexCount = pieceSd2.vertices.length;
    pieceSd2.categoryBits = 8;  // 1000
    pieceSd2.maskBits = 9;      // 1001
    pieceSd2.groupIndex = 1;
    var pieceBd = new b2BodyDef();
    pieceBd.AddShape(pieceSd1);
    pieceBd.AddShape(pieceSd2);
    for (var y = 0; y < 6; y++) {
      for (var x = 0; x < 3; x++) {
        pieceBd.position = new b2Vec2(center.x+10*x-5, center.y+10*y-5);
        var piece = w.CreateBody(pieceBd);
        piece.SetLinearVelocity(new b2Vec2(50 * Math.random() - 25,
          -30 * Math.random() - 50));
        piece.userData = 'piece';
      }
    }
  }

  // コンタクトオブジェクトを走査
  for (var c = w.GetContactList(); c; c = c.GetNext()) {
    if (0 < c.GetManifoldCount()) {
      var body1 = c.GetShape1().GetBody();
      var body2 = c.GetShape2().GetBody();

      // ターゲットに衝突していた場合ターゲットを削除して
      // エフェクトを作成
      if (body1.userData == 'target') {
        hit(body1);
      }
      else if (body2.userData == 'target') {
        hit(body2);
      }
    }
  }
}

/***** ゲーム画面を表示 *****/
function drawGame(w, c) {
  // 多角形からなる図形を指定された色で塗りつぶす
  function fillBody(b, color) {
    c.strokeStyle = color;
    c.fillStyle = color;
    c.beginPath();
    for (var s = b.GetShapeList(); s; s = s.GetNext()) {
      var poly = s;
      var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, 
        poly.m_vertices[0]));
      c.moveTo(tV.x, tV.y);
      for (var i = 0; i < poly.m_vertexCount; i++) {
        var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R,
          poly.m_vertices[i]));
        c.lineTo(v.x, v.y);
      }
      c.lineTo(tV.x, tV.y);
    }
    c.closePath();
    c.fill();
  }

  for (var b = w.GetBodyList(); b; b = b.GetNext()) {
    var image = new Image();
    var p = b.GetCenterPosition();
    switch (b.userData) {
      case 'ball':
        // ボールを表示
        image.src = 'image/ball.png';
        c.drawImage(image, p.x - 12, p.y - 12, 24, 24);
        break;
      case 'target':
        // ターゲットを表示
        image.src = 'image/star-gold48.png';
        c.drawImage(image, p.x - 24, p.y - 24, 48, 48);
        break;
      case 'clubHead':
        // ゴルフクラブを表示
        image.src = 'image/driver2.gif';
        c.save();
        c.translate(200, 300); 
        c.rotate(b.m_rotation);
        c.translate(-20, -5); 
        c.drawImage(image, 0, 0);
        c.restore();
        break;
      case 'tee':
        // ティーを表示
        fillBody(b, '#666');
        break;
      case 'ground':
        // 地面を表示
        fillBody(b, 'rgba(0, 150, 0, 0.5)');
        break;
      case 'piece':
        // ターゲットの破片を表示
        fillBody(b, Math.random() < 0.5 ? '#ffffff' : '#ffff00');
        break;
    }
  }
}

/***** ゲームが終了したかどうかをチェック *****/
function checkResult(w) {
  var hit = true;
  var finish = false;
  for (var b = w.GetBodyList(); b; b = b.GetNext()) {
    if (b.userData == 'target') {
      // ターゲットがまだ存在する
      hit = false;
    }
    else if (b.userData == 'ball') {
      var x = b.GetCenterPosition().x;
      if (x < 0 || 1000 < x) {
        // ボールが表示範囲外に出ていれば終了
        finish = true;
        b.userData = null;
      }
    }
  }

  if (finish) {
    var div = $('result');
    if (hit) {
      // ターゲットに命中
      div.innerHTML = 'Contaturations!';
    }
    else {
      // 外れ
      div.innerHTML = 'Miss!';
    }
    div.style.zIndex = 100;
    div.style.display = 'block';
  }
}

/****** ゲーム開始 ******/
Event.observe(window, 'load', function(e) {
  var mouse;
  var canvas = $$('canvas')[0];
  var context = canvas.getContext('2d');

  // アニメーションを実行
  setInterval(function() {
    // 表示をクリア
    context.clearRect(0, 0, 1000, 500);
    // 物体を次の位置へ移動
	world.Step(1/60, 1);
    // 衝突を処理
    handleContacts(world);
    // 物体を表示
    drawGame(world, context);
    //drawWorld(world, context);
    // 終了チェック
    checkResult(world, context);
  }, 10);

  // クラブヘッド上でマウスボタンが押されるとマウスジョイントを生成
  Event.observe(canvas, 'mousedown', function(e) {
    var point = new b2Vec2(Event.pointerX(e), Event.pointerY(e));
    if (clubHead.GetShapeList().TestPoint(point)) {
      // クラブヘッド上にマウスポインタがあるとき
      var mjd = new b2MouseJointDef();
      mjd.body1 = world.GetGroundBody();
      mjd.body2 = clubHead;
      mjd.target = point;
      mjd.maxForce = 10000000;
      mouse = world.CreateJoint(mjd);
    }
  });

  // ドラッグに連れてマウスジョイントのターゲットを変更
  Event.observe(canvas, 'mousemove', function(e) {
    if (mouse) {
      mouse.SetTarget(new b2Vec2(Event.pointerX(e), Event.pointerY(e)));
    }
  });

  // マウスのボタンをリリースするとマウスジョイントを削除
  Event.observe(canvas, 'mouseup', function(e) {
    if (mouse) {
      world.DestroyJoint(mouse);
      mouse = null;
    }
  });
});
