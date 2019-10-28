const BUILDUP_STRENGTH = [-2, 2]							// Min and Max Strength per Frame during Buildup
const BUILDUP_DURATION = [15, 100]							// Min and Max Duration of the Buildup time
const CREATING_CHANCE = 0.1									// How rare the creation is
const DECREASE_VALUE = 0.97									// How strongly the wind decreases per Frame

const verbose = false										// Log the events?


function randomInt(low, hih){
	return floor(random() * (hih-low) + low)
}


class Wind {
	constructor(initialStrength){
		this.strength = initialStrength
		this.buildupStrength = 0														// Strength the wind gains per Frame
		this.buildupDuration = 0														// How long the wind builds up
		
		this.markers = []
	}
	
	createWind(){
		if (random() > CREATING_CHANCE || this.strength != 0) return;					// Only create Wind sometimes
		
		this.buildupStrength = random(BUILDUP_STRENGTH[0], BUILDUP_STRENGTH[1])
		this.buildupDuration = randomInt(BUILDUP_DURATION[0], BUILDUP_DURATION[1])
		
		this.initDraw()
		if(verbose) console.log("Created Wind - Strength: " + this.buildupStrength + ", Duration: " + this.buildupDuration);
	}
	
	update(){
		// Increase Wind
		if (this.buildupStrength != 0 && this.buildupDuration != 0){					// We dont need to reset buildupStrength, because buildupDuration will decrease
			this.strength += this.buildupStrength
			this.buildupDuration--
		}
		
		// Decrease Wind
		if (this.strength != 0 && this.buildupDuration == 0){
			this.strength *= DECREASE_VALUE
			if ((this.strength > 0 && this.strength < 0.5) || (this.strength < 0 && this.strength > -0.5)){this.strength = 0}
		}
		
		// Apply
		gb.setForce(new Vec2D(this.strength, -0.05))
		if(verbose) console.log("Wind has Strength " + this.strength);
	}
	
	initDraw(){
		this.markers = []
		for (let i = 0; i < 5; i++){
			let x = this.buildupStrength>0 ? random(-100, -10) : random(width+100, width+10)
			let pos = createVector(x, random(100, height/2))
			this.markers.push(pos)
		}
	}
	
	draw(){
		if (this.buildupDuration != 0){
			// Draw Lines
			for (let i = 0; i < 5; i++){
				let x = this.markers[i].x
				let y = this.markers[i].y
				
				fill(255);
				line(x, y, x+100, y)
			}
			
			// Move markers
			for (let i = 0; i < 5; i++){
				this.markers[i].x += this.buildupStrength * 10
			}
		}
	}
}