export default class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    render(ctx, cellSize) {
        ctx.fillStyle = "black";
        ctx.fillRect(
            this.x * cellSize,
            this.y * cellSize,
            cellSize,
            cellSize
        );
    }
};
