// Clase estado se encarga de manejar todos los elementos del juego y su estado.
class State {
    constructor(status, warrior, obstacles, speed, score) {
        this.status = status;
        this.speed = speed;
        this.warrior = warrior
        this.obstacles = obstacles;
        this.score = score;
    }

    getPoints(){
        return this.score.getPoints();
    }

    static initialState(){
        return new State(
            'Run', // Estado inicial del juego
            new Warrior(0, 500-137, 0), // Posición inicial del guerrero
            new Spawner([], [], 0, 1000),
            new Speed(300),
            new Score(0) // Puntuación inicial
        )
    }
}