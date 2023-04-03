const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const groundImg = new Image();
const appleImg = new Image();
const snakeImg = new Image();
const bodySnakeImg = new Image();
const repeatImg = new Image();

groundImg.src = '/img/ground.jpg';
appleImg.src = '/img/apple.png';
snakeImg.src = '/img/head.png';
bodySnakeImg.src = '/img/body.png';
repeatImg.src = '/img/repeat.png';
let angle = 45;

const step = 24;

let apple = {
  x: Math.floor(Math.random() * (canvas.height / step)) * step,
  y: Math.floor(Math.random() * (canvas.width / step)) * step,
};

const tagScore = document.getElementById('score');
let dir;
let snake = [];
snake[0] = {
  x: 10 * step,
  y: 10 * step,
};

let score = 0;
let timeInterval = 350;
document.addEventListener('keydown', snakeMoving);
function game() {
  ctx.drawImage(groundImg, 0, 0);
  ctx.drawImage(appleImg, apple.x, apple.y, 24, 24);
  ctx.font = '24px Arial';

  for (let i = 0; i < snake.length; i++) {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    const tempCtx = document.createElement('canvas').getContext('2d');
    tempCtx.canvas.width = snakeImg.width;
    tempCtx.canvas.height = snakeImg.height;
    tempCtx.translate(snakeImg.width / 2, snakeImg.height / 2);
    tempCtx.rotate((45 * Math.PI) / angle);
    // Draw the rotated image on the temporary context

    tempCtx.drawImage(snakeImg, -snakeImg.width / 2, -snakeImg.height / 2);

    // Draw the rotated image on the canvas at its original position
    ctx.restore();
    if (i == 0 || i == 1) {
      ctx.drawImage(tempCtx.canvas, snake[i].x, snake[i].y, 24, 24);
    } else {
      ctx.drawImage(bodySnakeImg, snake[i].x, snake[i].y, 24, 24);
    }
    // Restore the canvas state
  }

  if (dir == 'left') snake[0].x -= step;
  else if (dir == 'right') snake[0].x += step;
  else if (dir == 'up') snake[0].y -= step;
  else if (dir == 'down') snake[0].y += step;

  if (snake[0].x > 19 * step) snake[0].x = 0;
  else if (snake[0].x < 0) snake[0].x = 456;
  else if (snake[0].y > 19 * step) snake[0].y = 0;
  else if (snake[0].y < 0) snake[0].y = 480;

  if (snake[0].x == apple.x && snake[0].y == apple.y) {
    score += 1;
    tagScore.textContent = `: ${score}`;

    if (score % 5 == 0) {
      timeInterval -= 10;
    }

    apple = {
      x: Math.floor(Math.random() * (canvas.height / step)) * step,
      y: Math.floor(Math.random() * (canvas.width / step)) * step,
    };
  } else if (snake.length > 1) {
    snake.pop();
  }
  const increaseSnakeBody = {
    x: snake[0].x,
    y: snake[0].y,
  };
  snake.unshift(increaseSnakeBody);
  for (let i = 2; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(stopGame);
      ctx.drawImage(repeatImg, 218, 218);
      canvas.addEventListener('click', function (event) {
        const x = event.pageX - canvas.offsetLeft;
        const y = event.pageY - canvas.offsetTop;
        if (x >= 218 && x <= 266 && y >= 218 && y <= 266);
        location.reload();
      });
    }
  }
}
let stopGame = setInterval(game, timeInterval);

function snakeMoving(event) {
  switch (event.keyCode) {
    case 37:
      if (dir != 'right') (dir = 'left'), (angle = 90);
      break;
    case 38:
      if (dir != 'down') (dir = 'up'), (angle = 45);
      break;
    case 39:
      if (dir != 'left') (dir = 'right'), (angle = -90);
      break;
    case 40:
      if (dir != 'up') (dir = 'down'), (angle = 0);
      break;
  }
}
