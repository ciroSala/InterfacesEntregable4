class Score{
    constructor(points){
        this.points = points; // Puntos iniciales
    }

    getPoints(){
        return this.points;
    }

    update(dt, state, keys) {
        const newPoints = this.points + dt * 10; // Incrementa puntos basado en la velocidad
        return new Score(newPoints);
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";

        const pointText = `Score: ${Math.floor(this.points)}`; // Dibuja el puntaje en la esquina superior izquierda
         ctx.fillText(pointText, 10, 30);

        // const textWidth = ctx.measureText(pointText).width; // Medir el texto para centrarlo
        
        // ctx.fillText(
        //     pointText,
        //     ctx.canvas.width - textWidth - 20,
        //     30
        // ); // Dibuja el puntaje en el centro de la pantalla
    }
}