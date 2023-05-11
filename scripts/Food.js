const getRandomInteger = (max) => {
    return Math.floor(Math.random() * max);
};

export default class Food {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        const image = ["img/mouse.png", "img/boost.png"]
        this.image = new Image();
        this.image.src = image[getRandomInteger(2)];
    }

    render(ctx, cellSize) {
        /*  ctx.fillStyle = "black"; */
        /*  ctx.fillRect( */
        /*      this.x * cellSize, */
        /*      this.y * cellSize, */
        /*      cellSize, */
        /*      cellSize */
        /*  ); */

        ctx.drawImage(
            this.image,
            this.x * cellSize,
            this.y * cellSize,
            cellSize,
            cellSize,
        );


    }
};
