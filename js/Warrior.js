class Warrior extends Object{
    static displaySheet = null; 
    static width = 140;
    static height = 137;


    constructor(x, y, speed) {
        super(x, y, speed, Warrior.width, Warrior.height); // Llamar al constructor de Object con valores por defecto
        this.util = new Util();
        this.stateWarrior = StateTypes.RUNNING;
        this.displaySheet = null;
    }

    static async load() {
        // Cargo las imagenes con las funciones especificas de util
        const [Run2, Jump] = await Promise.all([
            Util.loadImage("./img/warrior/Run2.png"),
            Util.loadImage("./img/warrior/Jump.png"),
            // Util.loadImage("sprites/warrior-jump.png"),
            // Util.loadImage("sprites/warrior-attack.png"),
        ]);

        // Creo el displayShet con el config, donde se guarda segun el estado los sprites necesarios
        this.displaySheet = new SpriteSheet({
            [StateTypes.RUNNING]: {
                interval: 150,
                sprites: [
                    new Sprite(0, 0, Warrior.width, Warrior.height, Run2),
                    new Sprite(184, 0, Warrior.width, Warrior.height, Run2),
                    new Sprite(368, 0, Warrior.width, Warrior.height, Run2),
                    new Sprite(552, 0, Warrior.width, Warrior.height, Run2),
                    new Sprite(736, 0, Warrior.width, Warrior.height, Run2),
                    new Sprite(920, 0, Warrior.width, Warrior.height, Run2),
                    new Sprite(1104, 0, Warrior.width, Warrior.height, Run2),
                    new Sprite(1288, 0, Warrior.width, Warrior.height, Run2),
                ]
            },
            [StateTypes.JUMPING]: {
                interval: 50,
                sprites: new Sprite(0, 0, Warrior.width, Warrior.height, Jump), // Reutilizamos imagen por simplicidad
                sprites: new Sprite(184, 0, Warrior.width, Warrior.height, Jump), // Reutilizamos imagen por simplicidad
            }
            // Puedes agregar más estados aquí
        });
    }
    
    update(dt, state, keys) {
        let x = this.x;
        let y = this.y;
        let ySpeed = this.speed // Velocidad por defecto (50)
        
        // -900(velocidad de salto) y 2200(velocidad de gravedad)
        //let jumpinTime = (2 * Math.abs(-900)) / 2200

        // Si el guerrero esta en el aire, se aplica gravedad
        if((y + this.height) < 500){  // Si y + la altura no da 500, significa que no está en el suelo
            ySpeed += dt * 2200; // Calcular gravedad
            this.stateWarrior = StateTypes.JUMPING;
        }
        
        // Si el guerrero está en el suelo y se presiona la tecla de salto
         if((y + this.height) === 500 && keys.has("ArrowUp")) { 
            ySpeed += -900; // Calcular salto
            this.stateWarrior = StateTypes.JUMPING;
        }

         // Si el guerrero está en el suelo
         if((y + dt * ySpeed) + this.height >= 500){ 
            y = 500 - this.height; // Ajustar posición al suelo
            ySpeed = 0; // Reiniciar velocidad de caída
            this.stateWarrior = StateTypes.RUNNING;
        }

        y = y + dt * ySpeed; // Actualizar posición vertical

        return new Warrior(x, y, ySpeed);
    }
    
    draw(ctx) {
        const sprite = Warrior.displaySheet.getSprite(this.stateWarrior);
        ctx.drawImage(
            sprite.image,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height,
            this.x,
            this.y,
            this.width,
            this.height,
        );
    }

    getHitbox() {
        return {
            x: this.x + 50,
            y: this.y,
            width: 90,
            height: this.height,
        };
    }
}

const StateTypes = {
    RUNNING: "Running",
    JUMPING: "Jumping",
}