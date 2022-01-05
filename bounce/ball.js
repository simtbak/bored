// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const give = 50
const width = canvas.width = window.innerWidth+give;
const height = canvas.height = window.innerHeight+give;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

class Doofus {
	constructor(init) { 
		this.x = init.x
		this.y = init.y
		this.velX = init.velX
		this.velY = init.velY
		this.color = init.color
		this.size = init.size
	}
}

Doofus.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
  //ctx.lineWidth = 2;
  //ctx.strokeStyle = "black";
  //ctx.stroke();
}

Doofus.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= -give) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= -give) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Doofus.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        this.velX = Math.abs(balls[j].velX - this.velX)
        this.velY = Math.abs(balls[j].velY - this.velY)
      }
    }
  }
}
var template = { x:50, y:100, velX:4, velY:4, color:'blue', size:10 }
let testBall = new Doofus(template);

let balls = [];

while (balls.length < 5000) {
  let size = random(10,30);
  let ball = new Doofus( {
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    x: random(0,width - size),
    y: random(0,height - size),
    velX: random(-2,2),
    velY: random(-2,2),
    color: 'rgba(' + random(16,155) + ',' + random(16,100) + ',' + random(16,155) + ', 1)',
    size: size
  } );

  balls.push(ball);
}

function loop() {
  //ctx.fillStyle = 'rgba(125, 128, 155, 0.25)';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
	//balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();