//Calco completo de la clase enemy.js
class Explosion {

    x = 100;
    y = 100;
    // Se reduce el tamaño X e Y de los enemigos
    // PENDIENTE: Cambiar el tamaño de los barriles
    w = 60; //80
    h = 60; //140
    assets = new Array();
    assetIndex = 0.0;
    type = 6;
    preangle = 0;

    constructor({w, h, type, speed}) {
        if (w == undefined) w = 240;
        if (h == undefined) h = 240;
        if (type == undefined) type = 6;
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
     * Precarga los assets de la explosion
     * @param {string[]} asset Ruta imagen normal de la explosion
     */
    load(...asset) {
        asset.forEach(img => {
            this.assets.push(loadImage(img));
        });
    }
    
    /**
     * Precarga los assets de la explosion
     * @param {string[]} asset Ruta imagen normal de la explosion
     */
    load(asset) {
        asset.forEach(img => {
            this.assets.push(loadImage(img));
        });
    }

    /**
     * Dibuja el la explosion en pantalla
     */
    draw(angle = 0) {
        if (angle == 0){
            image(this.assets[Math.floor(this.assetIndex)], this.x-(this.w/3), this.y-(this.h/3), this.w, this.h);
        }
        this.assetIndex = parseFloat(this.assetIndex) + 0.2;
        if (Math.floor(this.assetIndex) >= this.assets.length) this.assetIndex = (this.assets.length - 1);
    }

    /**
     * Mueve la explosion en pantalla
     * @param {Character} player Objeto jugador
     * @param {number} dir Constante de movimiento DIR_UP o DIR_DOWN
     */
    move(player, dir = DIR_DOWN) {
        var amount = this.speedScalar;
        if (dir == DIR_UP) amount * -1;

        this.y += amount;
    }

    /**
     * Setea la velocidad de la explosion
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
     * Normaliza la velocidad de la explosion al moverse en diagonal
     */
    normalizeSpeed() {
        this.speedScalar = this.speedScalar / 1.5;
    }
}