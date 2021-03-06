let data = [];
let particles = [];

let m = 1;
let b = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(51);
  
  for (let i = 0; i < data.length; i++){
		let x = map(data[i].x, 0, 1, 0, width);
		let y = map(data[i].y, 0, 1, height, 0);
		particles[i].update();
		particles[i].show();
  }

  if(data.length > 1){
    linearRegression();
    drawLine();
  }

}

function linearRegression() {
	let xsum = 0;
	let ysum = 0;

	for (let i = 0; i < particles.length; i++){
		xsum += particles[i].x;
		ysum += particles[i].y;
	}

	let xmean = xsum / data.length;
	let ymean = ysum / data.length;

	let num = 0;
	let den = 0;

	for(let i = 0; i < data.length; i++) {
		let x = data[i].x;
		let y = data[i].y;

		num += (x - xmean) * (y - ymean);
		den += (x - xmean) * (x - xmean);
	}

	m = num / den;
	b = ymean - m * xmean;
}


function drawLine() {
	let x1 = 0;
	let y1 = m * x1 + b;
	
	let x2 = 1;
	let y2 = m * x2 + b;

	x1 = map(x1, 0, 1, 0, width);
	y1 = map(y1, 0, 1, height, 0);
	x2 = map(x2, 0, 1, 0, width);
	y2 = map(y2, 0, 1, height, 0);

	stroke(255, 0, 255);
	strokeWeight(2);
	line(x1, y1, x2, y2);
}


function mousePressed(){
	let x = map(mouseX, 0, width, 0, 1);
	let y = map(mouseY, 0, height, 1, 0);

	let point = createVector(x,y);
	let particle = new Particle(mouseX, mouseY);
	data.push(point);
	particles.push(particle);
}