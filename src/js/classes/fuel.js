//Calco completo de la clase enemy.js
class Fuel {

    x = 100;
    y = 100;
    // Se reduce el tamaño X e Y de los enemigos
    // PENDIENTE: Cambiar el tamaño de los barriles
    w = 50; //80
    h = 50; //140
    asset;
    assets = new Array();
    type = 5;
    preangle = 0;
    withAnim = false;
    assetsIndex = parseFloat(0);

    constructor({w, h, type, speed}) {
        if (w == undefined) w = 50;
        if (h == undefined) h = 50;
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
        this.withAnim = false;
        this.asset = loadImage(img);
    }

    /**
     * Precarga los assets de la bencina con animación
     * @param {string} img Ruta imagen normal de la bencina
     */
    loadAnim(imgs) {
        this.withAnim = true;
        imgs.forEach(img => {
            this.assets.push(loadImage(img));
        });
    }


    /**
     * Dibuja la bencina en pantalla
     */
    draw(angle = 0) {
        if (!this.withAnim){
            image(this.asset, this.x, this.y, this.w, this.h);
        }else{
            image(this.assets[parseInt(this.assetsIndex)], this.x, this.y, this.w, this.h);
            this.assetsIndex += 0.2;
            if (parseInt(this.assetsIndex) >= this.assets.length) this.assetsIndex = parseFloat(0);
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