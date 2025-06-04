class Spawner{
    constructor(obstacles, coinsItems, nexAt, nextCoinAt) {
        this.obstacles = obstacles;
        this.coinsItems = coinsItems;
        this.nexAt = nexAt; // Tiempo para el próximo obstáculo
        this.nextCoinAt = nextCoinAt;
        this.jumpinTime = (2 * Math.abs(-900)) / 2200; // Calcular tiempo que esta en el aire un guerrero cuando salta

    }

    update(dt, state, keys) {
        // Actualizar cada obstáculo y eliminar los que ya no están en pantalla
        const obstacles = this.obstacles
        .map(obstacle => obstacle.update(dt, state, keys)) 
        .filter(obstacle => (obstacle.x + obstacle.width) > 0) // Eliminar obstáculos que ya no están en pantalla
    
        // Actualizar y filtrar monedas
        const coinsItems = this.coinsItems
            .map(coin => coin.update(dt, state, keys))
            .filter(coin => (coin.x + coin.width) > 0);

        //this.nextAt -= state.speed.value * dt;
        let nexAt = Math.max(0, this.nexAt - (state.speed.value * dt)); // La distancia del ultimo elemento, que va disminuyendo con la velocidad
        if(nexAt <=0 && obstacles.length < 3) { // Si hay distancia para generar un obstaculo y hay menos de 3 en pantalla
           
            nexAt = this.jumpinTime * state.speed.value + Math.random() * 1000; // La distancia que va a tener el proximo elemento
            
           obstacles.push(new Obstacle(1300-30, 500-128)); // Agregar un nuevo obstáculo
        }

        // Bonos (monedas)
        let nextCoinAt = Math.max(0, this.nextCoinAt - (state.speed.value * dt));
        console.log(nextCoinAt);
        if (nextCoinAt <= 0) {
            nextCoinAt = 2000 + Math.random() * 2000; 

            const coinY = 500 - 128 - 100 + Math.random() * 80;
            coinsItems.push(new Coin(1300-50, coinY));
        }

        return new Spawner(obstacles, coinsItems, nexAt, nextCoinAt);
    }

    draw(ctx) {
        this.obstacles.forEach(obstacle => {
            obstacle.draw(ctx);
        });

        this.coinsItems.forEach(coin => {
            console.log('dibujar moneda')
            coin.draw(ctx)
        });
    }
}