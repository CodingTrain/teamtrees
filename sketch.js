let tree = [];
let leaves = [];

let count = 0;

let physics;
let totalLevels = 8;

let gb;

function setup() {
  createCanvas(windowWidth, windowHeight);
  physics = new VerletPhysics2D();
  gb = new GravityBehavior(new Vec2D(0, -0.01));
  physics.addBehavior(gb);
  // physics.setWorldBounds(new Rect(0, 0, width, height));

  let a = new VerletParticle2D(width / 2, height);
  let b = new VerletParticle2D(width / 2, height - height / 4);
  a.lock();
  //b.lock();
  physics.addParticle(a);
  physics.addParticle(b);
  let root = new Branch(a, b, 0);
  tree[0] = root;
  for (let n = 0; n < totalLevels; n++) {
    for (let i = tree.length - 1; i >= 0; i--) {
      if (!tree[i].finished) {
        let a = tree[i].branchA();
        let b = tree[i].branchB();
        tree.push(a);
        tree.push(b);
        // if (n == 5) {
        //   let holder1 = new VerletParticle2D(a.end.x, 0);
        //   holder1.lock();
        //   let d1 = dist(holder1.x, holder1.y, a.end.x, a.end.y);
        //   let spring1 = new VerletSpring2D(holder1, a.end, d1, 0.01);
        //   physics.addSpring(spring1);
        //   let holder2 = new VerletParticle2D(b.end.x, 0);
        //   holder2.lock();
        //   let d2 = dist(holder2.x, holder2.y, b.end.x, b.end.y);
        //   let spring2 = new VerletSpring2D(holder2, b.end, d2, 0.01);
        //   physics.addSpring(spring2);
        // }
      }
      tree[i].finished = true;
    }
  }
}

function mousePressed() {
  // console.log(gb);
  // gb.force.x = 0;
  // gb.force.y = -50;
  // gb.scaledForce.x = 0;
  // gb.scaledForce.y = -50;
}

let xoff = 0;
function draw() {
  background(51);
  physics.update();

  xoff += 0.01;
  gb.scaledForce.y = map(noise(xoff + 1000), 0, 1, -0.02, 0.005);
  gb.scaledForce.x = map(noise(xoff), 0, 1, -0.02, 0.02);

  // if (mouseIsPressed) {
  //   let last = tree[tree.length - 1].end;
  //   last.lock();
  //   last.x = mouseX;
  //   last.y = mouseY;
  //   last.unlock();
  // }

  for (let i = 0; i < tree.length; i++) {
    tree[i].show();
  }
  //console.log(frameCount);
}
