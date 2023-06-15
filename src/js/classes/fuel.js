//Calco completo de la clase enemy.js
class Fuel {

    x = 100;
    y = 100;
    // Se reduce el tamaño X e Y de los enemigos
    // PENDIENTE: Cambiar el tamaño de los barriles
    w = 40; //80
    h = 40; //140
    asset;
    speedScalar = 5;
    type = 5;
    preangle = 0;

    constructor(w, h, type) {
        if (w == undefined) w = 30;
        if (h == undefined) h = 30;
        if (type == undefined) type = 5;
        this.w = w;
        this.h = h;
        this.type = type
        Object.freeze(this.w);
        Object.freeze(this.h);
        Object.freeze(this.type);
    }

    loadEnemy(img) {
        this.asset = loadImage(img);
    }

    showEnemy(angle = 0) {
        if (angle == 0){
            image(this.asset, this.x, this.y, this.w, this.h);
        }
    }

    setEnemySpeed(speed) {
        let __defSpeedScalar = 5;
        if (speed == undefined) {
            this.speedScalar = __defSpeedScalar;
        } else {
            this.speedScalar = speed;
        }
    }

    normalizeEnemySpeed() {
        this.speedScalar = this.speedScalar / 1.5;
    }
}