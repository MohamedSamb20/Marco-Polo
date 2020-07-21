/* global p5 */

let p = new p5(() => {});

let backgroundColor, spherePosition, rectPosition, inGame, score, extraPoints;

p.setup = function () {
  // Canvas & color settings
  p.createCanvas(500, 400);
  p.colorMode(p.HSB, 360, 100, 100);
  backgroundColor = 95;
  // This variable contains a JSON object
  inGame = true;
  score = 0;
  extraPoints = 500;
  spherePosition = {
    "x": 100,
    "y": 100
  }
  rectPosition = {
    "x": 130,
    "y": 140
  }
}

p.draw = function () {
  p.background(backgroundColor);
   p.rect(rectPosition.x, rectPosition.y, 20, 20);
  if (inGame) {
    //p.ellipse(spherePosition.x, spherePosition.y, 20, 20);
    //p.line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y);
    let distance1 = computeDistance(spherePosition, rectPosition);
    //let roundedDistance = p.round(distance1);
    //let outputText = "They are " + roundedDistance + " apart.";
    //p.text(outputText, 20, 40);
    p.text(`The circle and sphere are ${p.round(distance1)} units apart.`,20,40);
    let mousePosition = {
      x: p.mouseX,
      y: p.mouseY
    };
    let distance2 = computeDistance(spherePosition, mousePosition);
    let distanceDescription = computeCategoryOfDistance(
      spherePosition,
      mousePosition
    );
    p.text(`The circle and your mouse are ${p.round(distance2)} apart; you're ${distanceDescription}`,20,60);
    p.text(`Score: ${score}`,20,80);
    if(extraPoints >0){
      extraPoints--;
    }
    touchCircle();
  }
  else{
    p.text(`Good job. Press your mouse to try again.`,20,40);
    p.ellipse(spherePosition.x, spherePosition.y, 20, 20);
  }
}

function computeDistance(point1, point2) {
  let deltaX = point1.x - point2.x;
  let deltaY = point1.y - point2.y;
  let distance = p.sqrt((deltaX **2) + (deltaY **2));
  return distance;
}

function computeCategoryOfDistance(point1, point2) {
  let distance = computeDistance(point1, point2);
  if (distance > 200) {
    backgroundColor = p.color(240,10, 100);
    return "ice cold";
  } else if (distance > 150) {
    backgroundColor = p.color(180, 10, 100);
    return "cold";
  } else if (distance > 100) {
    backgroundColor = p.color(120, 10, 100);
    return "warmer";
  } else if (distance > 50) {
    backgroundColor = p.color(60, 10, 100);
    return "hot";
  } else {
    backgroundColor = p.color(0, 10, 100);
    return "red hot";
  }
}

function touchCircle(){
  let touch = p.collidePointCircle(p.mouseX, p.mouseY, spherePosition.x, spherePosition.y, 20);
  if(touch){
    inGame = false;
    score += 10 + p.round(extraPoints/50);
  }
}

p.mousePressed = function () {
  spherePosition.x = p.random(p.width);
  spherePosition.y = p.random(p.height);
  inGame = true;
  extraPoints = 500
}
