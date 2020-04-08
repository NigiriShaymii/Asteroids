
function Laser(spos, angle) {
  this.pos = createVector(spos.x, spox.y);
  this.vel = p5.Vector.fromAngle(angle);

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.render = function() {
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }
}
