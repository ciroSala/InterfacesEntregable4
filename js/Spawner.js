class Spawner{
    constructor(obstacles, nexAt) {
        this.obstacles = obstacles;
        this.nexAt = nexAt; // Tiempo para el próximo obstáculo
        this.jumpinTime = (2 * Math.abs(-900)) / 2200; // Calcular tiempo que esta en el aire un guerrero cuando salta

    }

    update(dt, state, keys) {
        // Actualizar cada obstáculo y eliminar los que ya no están en pantalla
        const obstacles = this.obstacles
        .map(obstacle => obstacle.update(dt, state, keys)) 
        .filter(obstacle => (obstacle.x + obstacle.width) > 0) // Eliminar obstáculos que ya no están en pantalla
    
        //this.nextAt -= state.speed.value * dt;
        let nexAt = Math.max(0, this.nexAt - (state.speed.value * dt)); // La distancia del ultimo elemento, que va disminuyendo con la velocidad
        console.log(nexAt);
        if(nexAt <=0 && obstacles.length < 3) { // Si hay distancia para generar un obstaculo y hay menos de 3 en pantalla
           
            nexAt = this.jumpinTime * state.speed.value + Math.random() * 1000; // La distancia que va a tener el proximo elemento
            
           obstacles.push(new Obstacle(1000-30, 500-128)); // Agregar un nuevo obstáculo
        }

        return new Spawner(obstacles, nexAt);
    }

    draw(ctx) {
        this.obstacles.forEach(obstacle => {
            obstacle.draw(ctx);
        });
    }
}