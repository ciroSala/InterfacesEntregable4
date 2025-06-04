class Speed{ // Clase para representar la velocidad del juego
    
    
    constructor(value){
        this.value = value;
        this.acc = 20; // Variable para mostrar la aceleracion de la velocidad
        this.speedMax = 1500; // Maxima velocidad alcanzable
    }

    update(dt, state, keys) {
        const value = Math.min(this.speedMax, this.value + (this.acc * dt));
        
        return new Speed(value);
    }
}