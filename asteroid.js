

function Asteroid(pos, r) {
  if(pos){
    this.pos = pos.copy();
  } else {
    this.pos =
      createVector((random(width / 2 - 50), random(height / 2 - 50)), (random(width / 2 + 50), random(height / 2 + 50)));
  }

  //hitbox

  if(r) {
      this.r = r;
  } else {
      this.r = random(15, 50);
  }

  this.img = loadImage('images/sugarOne.png');
  this.vel = p5.Vector.random2D();
  this.total = floor(random(5, 15));
  this.offset = [];
  // for (var i = 0 ; i < this.total; i++)
  // {
  //   this.offset[i] = random(-this.r * 0.5, this.r);
  // }

  this.update = function() {
    this.pos.add(this.vel);
  }

  //Spawns asteroid
  this.render = function() {
    push();
    // stroke(255);
    // noFill();
    translate(this.pos.x, this.pos.y);
    //ellipse(0, 0, this.r * 2);

    beginShape();
    for(var i = 0; i < this.total; i++)
    {
       var angle = map(i, 0, this.total, 0, TWO_PI);
       var r = this.r + this.offset[i];
       var x = r * cos(angle);
       var y = r * sin(angle);
       vertex(x, y);
    }
    endShape(CLOSE);
    image(this.img, -50, -50, 0, 0);

    pop();
  }

  //Splits asteroids
  this.breakup = function() {
    var newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  }

  //Teleport asteroids to the opposite side
  this.edges = function() {
    if(this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if(this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
}
