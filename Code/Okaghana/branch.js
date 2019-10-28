const scale = 0.67;

class Branch {
	constructor(begin, end, level) {
		this.begin = begin;
		this.end = end;
		this.level = level;
		this.finished = false;
		
		let d = dist(this.end.x, this.end.y, this.begin.x, this.begin.y);
		
		// Pull Joint to original position
		this.hook = new VerletParticle2D(this.end)  												// Creates a copy of the Joint on the same Position as the end of the Branch
		this.hook.lock()																			// Locks the Particle
		let springforce = map(this.level, 0, totalLevels, 0.01, 0.004)
		this.puller = new VerletSpring2D(this.hook, this.end, 10, springforce)
		this.puller.lockA()																			// Additionally locks one end of the Spring
		physics.addSpring(this.puller)
		
		// Spring from start to end
		let spring = new VerletSpring2D(this.begin, this.end, d, 0.01);
		physics.addSpring(spring);
	}

	show() {
		stroke(255);
		let sw = 4 / log(this.level + 2);
		strokeWeight(sw);
		line(this.begin.x, this.begin.y, this.end.x, this.end.y);
	}
	
	// Returns new Brach starting from this.end
	createBranch(angle) {
		let dir = this.end.sub(this.begin);
		dir.rotate(angle);
		dir.scaleSelf(scale);
		
		let newEnd = new VerletParticle2D(this.end.add(dir));
		physics.addParticle(newEnd);
		
		let branch = new Branch(this.end, newEnd, this.level + 1);
		return branch;
	}
}
