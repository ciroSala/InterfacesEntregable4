class Object{
    constructor(x, y, speed, width, height) {
        this.x = x;
        this.y = y;
        this.speed = speed; // Velocidad en el eje Y
        this.width = width;
        this.height = height;
    }
    
    draw(ctx){}

    update(dt, state, keys){}
}