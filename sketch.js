var ship;
var asteroids = [];
var lasers = [];
let space = "zoom";
let count = 0;
let score = 0;
let gameStarted = false;

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
}

function draw() {

  background(blood);

  switch (space) {
    case ('zoom'):
      zoomScreen();
      break;
    case ('gamePlay'):
      if (!gameStarted) {
        gameInit();
        gameStarted = true;
      }
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
  fill(255, 0, 0);

  textSize(100);
  text('Sugar Rush', windowWidth / 2, windowHeight / 2);

  fill(255);
  textSize(40);
  text('\n\n\nPress the "S" key to start playing...', windowWidth / 2, windowHeight / 2);
  text('\n\n If you immediately lost, refresh the page.', windowWidth / 2, windowHeight / 2);

  textSize(20);
  text('\n\n\n\n\n\n\n\n\n\n Left Arrow & Right Arrow: Turn the cell', windowWidth / 2, windowHeight / 2);
  text('\n\n\n\n\n\n\n\n\n\n\n Up Arrow: Move forward', windowWidth / 2, windowHeight / 2);
  text('\n\n\n\n\n\n\n\n\n\n\n\n Space: Shoot insulin', windowWidth / 2, windowHeight / 2);
}

function gameInit() {
  ship = new Ship();
  count = round(random(25, 50));
  console.log(count);

  //spawns asteroids in the canvas,
  for (var i = 0; i < count; i++) {
    asteroids.push(new Asteroid());
  }

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

  text("Score: " + score, width / 10, height / 20);
  console.log(lasers.length);

  if (score === count) {
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
  text(" You're overwhelmed by all that sugar!", windowWidth / 2, windowHeight / 2);
  text('\n\n Refresh the webpage to play again', windowWidth / 2, windowHeight / 2);
}

function youWon() {
  background(0);
  fill(255);
  text('You are hardworking and healthy!', windowWidth / 2, windowHeight / 2);
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
