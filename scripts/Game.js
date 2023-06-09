import Snake from "./Snake.js";
import Food from "./Food.js";

const getRandomInteger = (max) => {
  return Math.floor(Math.random() * max);
};


export default class Game {
  constructor() {
    const canvas = document.querySelector("#game");
    this.ctx = canvas.getContext("2d");
    this.speed = 8;
    this.cellSize = 30;
    this.cellCount = canvas.width / this.cellSize;
    this.before = new Date().getTime();

    this.createInterval();
    this.eventListeners();
  }

  eventListeners() {
    const handleEvent = (event) => {
      const possibleEvents = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      const direction = possibleEvents[event.code];

      if (direction === "up" && this.snake.direction === "down" ||
        direction === "right" && this.snake.direction === "left" ||
        direction === "down" && this.snake.direction === "up" ||
        direction === "left" && this.snake.direction === "right") {
        return;
      }



      this.snake.setDirection(direction);
    };

    document.addEventListener("keydown", handleEvent);
  }

  play() {
    this.spawnSnake();
    this.spawnFood();
    this.playing = true;
    this.score = 0;
  }

  createInterval() {
    this.updateWithForcedContext = this.update.bind(this);
    requestAnimationFrame(this.updateWithForcedContext);

  }

  update() {
    requestAnimationFrame(this.updateWithForcedContext);

    if (!this.playing) {
      return;
    }


    this.now = new Date().getTime();
    const delta = this.now - this.before;
    const interval = 1000 / this.speed;

    if (delta > interval) {
      this.before = this.now - (delta % interval);
    } else {
      return;
    }

    const head = { ...this.snake.segments[0] }; // {x: 0, y: 4}
    const direction = this.snake.direction;

    switch (direction) {
      case "left":
        if (head.x === 0) {
          head.x = this.cellCount;
        }
        head.x = head.x - 1;
        break;
      case "right":
        head.x = head.x + 1;
        if (head.x === this.cellCount) {
          head.x = 0;
        }
        break;
      case "up":
        if (head.y === 0) {
          head.y = this.cellCount;
        }
        head.y = head.y - 1;

        break;
      case "down":
        head.y = head.y + 1;
        if (head.y === this.cellCount) {
          head.y = 0;
        }
        break;
    }



    const hasEaten = head.x === this.food.x && head.y === this.food.y;

    if (hasEaten) {
      this.score = this.score + 1;
      console.log(this.score);

      if (this.score % 5 === 0) {
        this.speed = this.speed + 1;
      }

      delete this.food;
      this.spawnFood();


    }

    const tail = this.snake.segments.slice(1);
    const hasCollision = tail.some((segment) => {
      return segment.x === head.x && segment.y === head.y;
    });


    if (hasCollision) {
      this.gameOver();
    }



    this.snake.move(head, hasEaten);

    this.ctx.clearRect(0, 0, 540, 540);

    this.ctx.fillStyle = "#a7d204";
    this.ctx.fillRect(0, 0, 540, 540);
    this.snake.render(this.ctx, this.cellSize);
    this.food.render(this.ctx, this.cellSize);
  }

  spawnSnake() {
    const initialLength = 4;
    const ctx = this.ctx;
    const cellSize = this.cellSize;

    const headX = 0;
    const headY = 0;
    const tailX = headX + (initialLength - 1);
    const tailY = headY + (initialLength - 1);

    const directions = ["up", "left", "down", "right"];
    this.snake = new Snake(directions[2]);
    this.snake.createSegments(headX, headY, tailX, tailY);
    this.snake.render(ctx, cellSize);
  }

  spawnFood() {
    const x = getRandomInteger(this.cellCount);
    const y = getRandomInteger(this.cellCount);

    const checkFoodPosition = this.snake.segments.some((segment) => {
      return segment.x === x && segment.y === y;

    });

    if (checkFoodPosition) {
      console.log("magna dar culo")
      return this.spawnFood();
    }



    this.food = new Food(x, y);
    this.food.render(this.ctx, this.cellSize);

  }

  gameOver() {
    this.playing = false;
    console.log("GAME OVER");
  }

  testCanvas() {
    // SET FILL STYLE IN GIALLO
    this.ctx.fillStyle = "#ffff00";

    // rettangolo pieno grande tutto 540 x 540
    this.ctx.fillRect(0, 0, 540, 540);

    // cambio colore in fucsia
    this.ctx.fillStyle = "#ff00ff";

    // rettangolo pieno da x 0 y 0 a 540/2 (metà)
    this.ctx.fillRect(0, 0, 270, 270);

    // cambio colore in fucsia
    this.ctx.fillStyle = "#00ffff";

    // rettangolo pieno da x 270 y 270 a 540/2 (metà)
    this.ctx.fillRect(270, 270, 270, 270);
  }
}
