var distribution = new Array(360);

function setup() {
  createCanvas(100, 100);
  for (var i = 0; i < distribution.length; i++) {
    distribution[i] = floor(randomGaussian(0,15));
  }
}

function draw() {
  background(204);
 translate(width/2, width/2);
 for (var i = 0; i < distribution.length; i++) {
    rotate(TWO_PI/distribution.length);
    stroke(0);
    var dist = abs(distribution[i]);
    line(0, 0, dist, 0);
  }
}