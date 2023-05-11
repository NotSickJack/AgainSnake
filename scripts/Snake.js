export default class Snake {
  constructor(direction) {
    this.segments = [];
    this.direction = direction;



  }

  createSegments(minX, minY, maxX, maxY) {
    // this.segments = [
    //   {
    //     x: 0,
    //     y: 0
    //   },{
    //     x: 1,
    //     y: 0
    //   }
    // ]

    switch (this.direction) {
      case "left":
        for (let i = minX; i <= maxX; i++) {
          this.segments.push({ x: i, y: minY });
        }
        break;
      case "right":
        for (let i = maxX; i >= minX; i--) {
          this.segments.push({ x: i, y: minY });
        }
        break;
      case "up":
        for (let i = minY; i <= maxY; i++) {
          this.segments.push({ x: minX, y: i });
        }
        break;
      case "down":
        for (let i = maxY; i >= minY; i--) {
          this.segments.push({ x: 0, y: i });
        }
        break;
    }

    // console.log(this.segments);
  }

  render(ctx, cellSize) {
    ctx.fillStyle = "black";

    this.segments.forEach((segment) => {
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize
      );
    });
  }

  setDirection(direction) {
    if (direction === "left" ||
      direction === "right" ||
      direction === "up" ||
      direction === "down") {
      this.direction = direction;
    }



  }
  move(head, hasEaten) {
    if (!hasEaten) {
      this.segments.pop();
    }
    this.segments.unshift(head);
  }
}
