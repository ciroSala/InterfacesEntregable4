class Coin extends Object {
    static displaySheet = null; 
    static width = 32;
    static height = 32;
    static image = null;

    constructor(x, y) {
        super(x, y, 0, Coin.width, Coin.height);
        this.displaySheet = null;
    }

    static async load() {
        const img = await Util.loadImage("./img/bonus/Coin.png");

          // Creo el displayShet con el config, donde se guarda segun el estado los sprites necesarios
        this.displaySheet = new SpriteSheet({
            'Running': {
                interval: 150,
                sprites: [
                    new Sprite(0, 0, Coin.width, Coin.height, img),
                    new Sprite(32, 0, Coin.width, Coin.height, img),
                    new Sprite(64, 0, Coin.width, Coin.height, img),
                    new Sprite(96, 0, Coin.width, Coin.height, img),
                    new Sprite(128, 0, Coin.width, Coin.height, img),
                    new Sprite(160, 0, Coin.width, Coin.height, img),
                    new Sprite(192, 0, Coin.width, Coin.height, img),
                    new Sprite(224, 0, Coin.width, Coin.height, img),
                    new Sprite(256, 0, Coin.width, Coin.height, img),
                    new Sprite(288, 0, Coin.width, Coin.height, img),
                    new Sprite(320, 0, Coin.width, Coin.height, img),
                    new Sprite(352, 0, Coin.width, Coin.height, img),
                ]
            },
        });
    }

    update(dt, state, keys) {
        const x = this.x - dt * state.speed.value;
        return new Coin(x, this.y);
    }

    draw(ctx) {
        const sprite = Coin.displaySheet.getSprite('Running');
        ctx.drawImage(
            sprite.image,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height,
            this.x,
            this.y,
            this.width,
            this.height,
        );
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