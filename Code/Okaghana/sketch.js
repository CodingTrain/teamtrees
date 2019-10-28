const totalLevels = 9;

let tree = [];
let leaves = [];

let physics;										// holds Physics Engine
let gb;												// holds the Gravity Behaviour
let wind;											// hold Wind

function setup(){
	createCanvas(windowWidth, windowHeight);
    physics = new VerletPhysics2D();
  
    wind = new Wind(0);
  
    gb = new GravityBehavior(new Vec2D(wind, -0.05));
    physics.addBehavior(gb);

	// Create inital Branch (basically the root)
    let a = new VerletParticle2D(width / 2, height).lock();
    let b = new VerletParticle2D(width / 2, height - height / 4);
    physics.addParticle(a);
    physics.addParticle(b);
    tree.push(new Branch(a, b, 0));

    for (let n = 0; n < totalLevels; n++) {
    	for (let i = tree.length - 1; i >= 0; i--) {
			if (!tree[i].finished) {
				let a = tree[i].branchA();
				let b = tree[i].branchB();
				tree.push(a);
				tree.push(b);
			}
		tree[i].finished = true;
		}
	}
}

function mousePressed(){
  // console.log(gb);
  // gb.force.x = 0;
  // gb.force.y = -50;
  // gb.scaledForce.x = 0;
  // gb.scaledForce.y = -50;
}

let xoff = 0;
function draw(){
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
  
	wind.createWind()	 // Randomly Create wind
	wind.draw()
	wind.update()

	for (let i = 0; i < tree.length; i++) {
		tree[i].show();
	}
    //console.log(frameCount);
}
