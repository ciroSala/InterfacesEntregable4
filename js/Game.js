//  Clase Juego que maneja todo el estado de ljuego y se encarga de dibujar y actualizar
// el estado.
class Game {
    state;
    collision;

    constructor (state) {
        this.state = state;
        this.display = new Display();
        this.collision = new Collision();
    }

    async load(){
        return Promise.all([
            Warrior.load(),
            Obstacle.load(),
        ])
    }

    update(dt, keys){
        const warrior = this.state.warrior.update(dt, this.state, keys);
        const obstacles = this.state.obstacles.update(dt, this.state, keys);
        const speed = this.state.speed.update(dt, this.state, keys);
        const status = this.collision.detected(warrior, obstacles);
        const score = this.state.score.update(dt, this.state, keys);

        this.state = new State(status, warrior, obstacles, speed, score);
    }

    // Una funcion para obtener puntos
    getPoints(){
        return this.state.getPoints();
    }

    /**
     * Draws the current state of the game onto the canvas.
     * @param {State} state - The current game state containing the warrior to draw.
     */
    draw(){
        this.display.draw(this.state);
    }

    restart(){
        console.log("Restarting game...");
        this.state = State.initialState();
    }
}