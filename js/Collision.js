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
        // Al rect2 (Mi obstaculo), verifico con una hitbox menos alta, porque el 
        // Sprite ocupa de mas
        const obstacle = rect2.getHitbox();
        return (
            rect1.x < obstacle.x + obstacle.width &&
            rect1.x + rect1.width > obstacle.x &&
            rect1.y < obstacle.y + obstacle.height &&
            rect1.y + rect1.height > obstacle.y
        );
    }
}
