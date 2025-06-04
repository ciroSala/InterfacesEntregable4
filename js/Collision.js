class Collision {
    constructor() {
        // Constructor logic if needed
    }

    detected(warrior, obstacles) {
        if(obstacles.obstacles.some(obstacle => this.areRectsColliding(warrior, obstacle))) {
            return 'GameOver';
        }else{
            return 'Run';
        }
    }

    areRectsColliding(rect1, rect2) {
        // A los objetos, verifico con una hitbox mas chica, porque los 
        // Sprites tienen espacio vacio de alto y ancho
        const warrior = rect1.getHitbox();
        const obstacle = rect2.getHitbox();
         
        return (
            warrior.x < obstacle.x + obstacle.width &&
            warrior.x + warrior.width > obstacle.x &&
            warrior.y < obstacle.y + obstacle.height &&
            warrior.y + warrior.height > obstacle.y
        );
    }
}
