function preload() {
  customFont = loadFont('./Inspiration-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  textFont(customFont);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  frameRate(35); 
  let totalBoxes = 21;
  let boxesToShow = floor(frameCount / 10);
  let delayFrames = 30;

  for (let i = 0; i < totalBoxes - 1; i++) {
    if (i < boxesToShow - 1) {
      let angle = i * 139.5;
      let r = sqrt(i) * 75;
      let x = r * cos(angle);
      let y = r * sin(angle);
      
      push();
      translate(x, y);
      rotate(angle);
      stroke('#AF251E');
      strokeWeight(2);
      fill(0);
      rect(0, 0, 65, 65);
      fill(255);
      stroke('white');
      textSize(45);
      text(i + 1, 0, -10);
      pop();
    }
  }

  // Draw the 21st box in the center
  if (boxesToShow >= totalBoxes + delayFrames / 10) {
    let hover = abs(mouseX - width / 2) < 65 && abs(mouseY - height / 2) < 65;
    push();
    stroke('#AF251E');
    strokeWeight(2);
    stroke(hover ? '0' : '#FF6347');
    fill(0);
    rect(0, 0, 130, 130);
    fill(255);
    stroke('white');
    textSize(65);
    text(21, 0, -10); // 21st box
    pop();

    // If clicked, you can redirect or perform another action
    if (hover && mouseIsPressed) {
      window.open("https://laperzyna.github.io/writeOut/");
    }
  }
}
