class SpriteSheet{
    constructor(config){
        this.config = config;
    }

    getSprite(state){
        const config = this.config[state];

        if(!Array.isArray(config.sprites)){
            return config.sprites;
        }

        const index = Math.floor(Date.now() / config.interval) % config.sprites.length;

        return config.sprites[index];
    }
}