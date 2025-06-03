class Display{
    constructor(){
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1000; // Ancho del canvas
        this.canvas.height = 500; // Alto del canvas
    }

    /**
     * Updates the display with the current game state.
     * @param {State} state - The current game state containing the warrior and obstacles.
     */
    draw(state){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpiar el canvas
        
        state.warrior.draw(this.ctx); // Dibujar el guerrero
        state.obstacles.draw(this.ctx); // Dibujar los obstáculos
        state.score.draw(this.ctx); // Dibujar la puntuación
    }
}