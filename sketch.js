//let easing = 0.05;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  frameRate(50); 
  let totalBoxes = 20;
  let boxesToShow = floor(frameCount / 10);

  for (let i = 0; i < totalBoxes; i++) {
    // Only drawing to 20
    if (i < boxesToShow) {
      // angle to space out the boxes
      let angle = i * 137.5;
      // spiral effect - :/
      let r = sqrt(i) * 85;
      let x = r * cos(angle);
      let y = r * sin(angle);

      push();
      translate(x, y);
      rotate(angle);
      stroke('#AF251E');
      strokeWeight(2);
      fill(0);
      rect(0, 0, 80, 80);
      fill(255);
      stroke('white');
      textSize(40);
      text(i + 1, 0, 0);
      pop();
    }
  }
}


