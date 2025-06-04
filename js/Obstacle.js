class Obstacle extends Object{
    static warriorX = 0;
    static warriorY = 500-137
    static displaySheet = null; 
    static width = 90;
    static height = 128;
    
    constructor(x, y) {
        super(x, y, 0, 90, 128); // Llamar al constructor de Object con valores por defecto
        this.displaySheet = null;
    }

       static async load() {
        // Cargo las imagenes con las funciones especificas de util
        const img = await Util.loadImage("./img/warrior2/RunAttack.png");

        // Creo el displayShet con el config, donde se guarda segun el estado los sprites necesarios
        this.displaySheet = new SpriteSheet({
            'RunAttack': {
                interval: 150,
                sprites: [
                    new Sprite(0, 0, Obstacle.width, Obstacle.height, img),
                    new Sprite(128, 0, Obstacle.width, Obstacle.height, img),
                    new Sprite(256, 0, Obstacle.width, Obstacle.height, img),
                    new Sprite(384, 0, Obstacle.width, Obstacle.height, img),
                    new Sprite(512, 0, Obstacle.width, Obstacle.height, img),
                    new Sprite(640, 0, Obstacle.width, Obstacle.height, img),
                ]
            },
            // Puedes agregar más estados aquí
        });
    }

    update(dt, state, keys){
        let x = this.x; // Mover el obstáculo hacia la izquierda a una velocidad constante
        x = this.x - dt * state.speed.value; // Mover el obstáculo hacia la izquierda a una velocidad constante
        return new Obstacle(x, this.y);
    }
    
    draw(ctx) {
        const sprite = Obstacle.displaySheet.getSprite('RunAttack');
        if (!sprite) return;
        
        const flip = Obstacle.warriorX < this.x;
        
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(this.x,this.y,this.width,this.height);

        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

        if (flip) {
            ctx.scale(-1, 1);
        }

        ctx.drawImage(
            sprite.image,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.restore();
    }

    getHitbox() {
        return {
            x: this.x,
            y: this.y + 30,
            width: this.width,
            height: 90
        };
    }
}