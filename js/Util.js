class Util {

    // Método para crear elementos con atributos
    static elt(name, attrs) {
        let dom = document.createElement(name);
        for (let attr in attrs) {
            dom.setAttribute(attr, attrs[attr]);
        }
        return dom;
    }

    // Método para cargar imagen como promesa
    static async loadImage(url) {
        return new Promise((resolve) => {
            const img = this.elt('img', { src: url }); // usar this.elt()
            img.addEventListener('load', () => {
                resolve(img);
            }, { once: true });
        });
    }
}