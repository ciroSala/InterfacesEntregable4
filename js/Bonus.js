class Bonus extends Object {
    static width = 64;
    static height = 64;
    static image = null;

    constructor(x, y) {
        super(x, y, 0, Bonus.width, Bonus.height);
    }

    static async load() {
        Bonus.image = await Util.loadImage("./img/bonus/bonus.png");
    }

    update(dt, state) {
        const x = this.x - dt * state.speed.value;
        return new Bonus(x, this.y);
    }

    draw(ctx) {
        if (Bonus.image) {
            ctx.drawImage(Bonus.image, this.x, this.y, this.width, this.height);
        }
    }

    getHitbox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}