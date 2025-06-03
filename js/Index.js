// Conjunto para guardar la tecla presionada
const keys = new Set();
const sky = document.getElementById('sky');
const ground = document.getElementById('ground');
const menu = document.getElementById('menu');


// Creamos un juego con el guerrero en la posición inicial
const game = new Game(new State('Run', new Warrior(0, 500-137, 0), new Spawner([]), new Speed(500), new Score(0)));

// Inicializamos el tiempo de la última actualización
let lastTime = 0;

// Escuchamos los eventos de teclado para agregar o eliminar teclas del conjunto
document.addEventListener("keydown", function(event) {
    keys.add(event.key);
    if(game.state.status == 'GameOver' && event.code === "Space") {
        lastTime = 0; // Reiniciar el tiempo
        menu.classList.add('hidden');    // Ocultar menu
        game.restart(); // Reiniciar el juego si se presiona Enter
        requestAnimationFrame(run); // Iniciar el bucle del juego
    }

});


document.addEventListener("keyup", function(event) {
    keys.delete(event.key);
});



//  Función principal que se ejecuta en cada frame (Game Loop)
// y actualiza el juego y dibuja el estado actual
function run(){
    const dt = lastTime === 0 ? 0 : (performance.now() - lastTime) / 1000;
    lastTime = performance.now();

    game.update(dt, keys);
    game.draw(); 

    if(game.state.status === 'Run') {
        requestAnimationFrame(run);
    }else{
        // Al menu le saco la clase que lo oculta
        menu.classList.remove('hidden');
        
        // Agarro los puntos y los metos al div
        let puntos = game.getPoints();
        
        const parrafo = menu.querySelector("p");
        parrafo.textContent = `Puntos totales: ${puntos}`;
    }
}

game.load().then(() => requestAnimationFrame(run));