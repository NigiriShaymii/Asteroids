var ship;
var asteroids = [];
var lasers = [];
let space = "zoom";
let count = 0;
let score = 0;

function preload() {
  sugarOne = loadImage('images/sugarOne.png');
  cell = loadImage('images/cell.png');
  blood = loadImage('images/blood.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //tint(255, 137);

  textAlign(CENTER);
  textSize(40);
  ship = new Ship();
  count = round(random(30, 50));
  console.log(count);

  for (var i = 0; i < count; i++) {
    asteroids.push(new Asteroid());
  }
  asteroids.push(new Asteroid());
}

function draw() {

  background(blood);


  switch (space) {
    case ('zoom'):
      zoomScreen();
      break;
    case ('gamePlay'):
      gamePlay();
      break;
    case ('youWon'):
      youWon();
      break;
    case ('youLose'):
      youLose();
      break;
    default:
      break;
  }
}

function zoomScreen() {
  background(0);
  fill(255);
  text('Press the "S" key to start playing...', windowWidth / 2, windowHeight / 2);
  text('\n If you immediately lost, refresh the page.', windowWidth / 2, windowHeight / 2);
}


function gamePlay() {
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log('ouch!');
      space = 'youLose';
    }

    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          // if (asteroids[j].r > 10) {
          //   var newAsteroids = asteroids[j].breakup();
          //   asteroids = asteroids.concat(newAsteroids);
          // }
          
          score += 1;
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  text("Score: " + score, width/10, height /20);
  console.log(lasers.length);

  if(score === count + 1)
  {
    space = "youWon";
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

function youLose() {
  background(0);
  fill(255);
  text('You lose.', windowWidth / 2, windowHeight / 2);
  text('\n\n Refresh the webpage to play again', windowWidth / 2, windowHeight / 2);
}

function youWon() {
  background(0);
  fill(255);
  text('You win!', windowWidth / 2, windowHeight / 2);
  text('\n\n Refresh the webpage to play again', windowWidth / 2, windowHeight / 2);
}


function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {

  if (key === 's') {
    space = 'gamePlay';
  }

  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }
}
