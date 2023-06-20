//Calco completo de la clase enemy.js
class Fuel {

    x = 100;
    y = 100;
    // Se reduce el tamaño X e Y de los enemigos
    // PENDIENTE: Cambiar el tamaño de los barriles
    w = 40; //80
    h = 40; //140
    asset;
    type = 5;
    preangle = 0;

    constructor({w, h, type, speed}) {
        if (w == undefined) w = 30;
        if (h == undefined) h = 30;
        if (type == undefined) type = 5;
        if (speed == undefined) speed = 6;
        this.w = w;
        this.h = h;
        this.type = type;
        this.speedScalar = speed;
        Object.freeze(this.w);
        Object.freeze(this.h);
        Object.freeze(this.type);
    }

    /**
     * Precarga los assets de la bencina
     * @param {string} img Ruta imagen normal de la bencina
     */
    load(img) {
        this.asset = loadImage(img);
    }
    /**
     * Dibuja la bencina en pantalla
     */
    draw(angle = 0) {
        if (angle == 0){
            image(this.asset, this.x, this.y, this.w, this.h);
        }
    }

    /**
     * Mueve la bencina en pantalla
     * @param {Character} player Objeto jugador
     * @param {number} dir Constante de movimiento DIR_UP o DIR_DOWN
     */
    move(player, dir = DIR_DOWN) {
        var amount = this.speedScalar;
        if (dir == DIR_UP) amount * -1;

        this.y += amount;
    }

    /**
     * Setea la velocidad de la bencina
     * @param {number} speed Velocidad deseada
     */
    setSpeed(speed) {
        let __defSpeedScalar = 5;
        if (speed == undefined) {
            this.speedScalar = __defSpeedScalar;
        } else {
            this.speedScalar = speed;
        }
    }
    /**
     * Normaliza la velocidad de la bencina al moverse en diagonal
     */
    normalizeSpeed() {
        this.speedScalar = this.speedScalar / 1.5;
    }
}