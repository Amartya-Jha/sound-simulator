let fft

let Particle = function (position) {
  this.position = position
  this.speed = createVector(0, 2)
  this.color = [random(0, 255), random(0, 255), random(0, 255)]
  this.draw = function () {
    circle(this.position.x, this.position.y, this.diameter)
    fill(this.color)
  }
  this.update = function (energy) {
    this.position.y += this.speed.y * energy * 10
    if (this.position.y > height) {
      this.position.y = 0
    }
    this.diameter = random(5, 7) + energy * 100
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()

  let mic = new p5.AudioIn()
  mic.start()

  fft = new p5.FFT()
  fft.setInput(mic)

  positionParticles()
}

function draw() {
  background(0, 0, 0)
  let spectrum = fft.analyze()
  updateParticles(spectrum)
}
function positionParticleWave(particles) {
  // takes array (particles)
  // puts the 'tickle' in par-tickle
  
  for (let i = 0; i < particles.length; i++) {
    let x = i / binCount * width * 2
    let y = random(0, height)
    let position = createVector(x, y)
    let partickle = new Particle(position)
    particles[i] = partickle
  }
  
}

function updateParticles(spectrum) {
  // update and draw all [binCount] particles!
  // Each particle gets a level that corresponds to
  // the level at one bin of the FFT spectrum. 
  // This level is like amplitude, often called "energy."
  // It will be a number between 0-255.
  spectrum.forEach((bin, i) => {
    let binLevel = map(bin, 0, 255, 0, 1)
    particles[i].update(binLevel)
    particles[i].draw()
  })
}