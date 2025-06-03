class Spawner{
    constructor(obstacles, nexAt) {
        this.obstacles = obstacles;
        this.nexAt = nexAt || 0; // Tiempo para el próximo obstáculo
    }

    update(dt, state, keys) {
        // Actualizar cada obstáculo y eliminar los que ya no están en pantalla
        const obstacles = this.obstacles
        .map(obstacle => obstacle.update(dt, state, keys)) 
        .filter(obstacle => (obstacle.x + obstacle.width) > 0) // Eliminar obstáculos que ya no están en pantalla
        let jumpinTime = (2 * Math.abs(-900)) / 2200; // Calcular tiempo que esta en el aire con el salto y la gravedad

        let nexAt = Math.max(0, this.nexAt - (state.speed.value * dt));
        
        if(nexAt === 0 && obstacles.length < 3) { // Si es tiempo de generar un nuevo obstáculo y hay menos de 3 en pantalla
            nexAt = jumpinTime * state.speed.value + Math.random() * 1000; // Calcular el tiempo para el próximo obstáculo
            
            obstacles.push(new Obstacle(1000-30, 500-128)); // Agregar un nuevo obstáculo
        }


        if(obstacles.length < 3){ // Limitar a 3 obstáculos en pantalla
            if(obstacles.length === 0 ) {
                obstacles.push(new Obstacle(1000-30, 500-128));
            }else{
                // Agarramos el ultimo obstaculo y verificamos si hay una distancia 
                const last = obstacles[obstacles.length - 1];
                if(last && ((last.x + last.width) + 300 < 1000)) { // Si el último obstáculo está a más de 300 píxeles del borde derecho
                    // Agregar un nuevo obstáculo
                    obstacles.push(new Obstacle(1000-30, 500-128)); // Agregar un nuevo obstáculo
                }
            }
        }
        return new Spawner(obstacles);
    }

    draw(ctx) {
        this.obstacles.forEach(obstacle => {
            obstacle.draw(ctx);
        });
    }
}