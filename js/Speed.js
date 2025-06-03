class Speed{
    constructor(value){
        this.value = value;
    }

    update(dt, state, keys) {
        const value = Math.min(1000, this.value + (20 * dt));
        
        return new Speed(value);
    }
}