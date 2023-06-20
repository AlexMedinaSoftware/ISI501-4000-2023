class Character {

    x = 307;
    y = 510;
    w = 80; //80
    h = 140; //140
    asset;
    assetL;
    assetR;
    speedScalar = 5;

    constructor(w, h) {
        if (w == undefined) w = 80;
        if (h == undefined) h = 140;
        this.w = w;
        this.h = h;
        Object.freeze(this.w);
        Object.freeze(this.h);
    }

    /**
     * Precarga los assets del jugador
     * @param {string} img Ruta imagen normal del vehiculo
     * @param {string} imgL Ruta imagen virando a la izquierda del vehiculo
     * @param {string} imgR Ruta imagen virando a la derecha del vehiculo
     */
    load(img, imgL, imgR) {
        this.asset = loadImage(img);
        if (imgL != undefined) this.assetL = loadImage(imgL);
        if (imgR != undefined) this.assetR = loadImage(imgR);
    }

    /**
     * Dibuja el jugador en pantalla
     */
    draw(angle = 0) {
        if (angle == 0) {
            image(this.asset, this.x, this.y, this.w, this.h);
        } else if (angle < 0) {
            if (this.assetL != undefined) {
                image(this.assetL, this.x, this.y, this.w, this.h);
            } else {
                image(this.asset, this.x, this.y, this.w, this.h);
            }
        } else if (angle > 0) {
            if (this.assetR != undefined) {
                image(this.assetR, this.x, this.y, this.w, this.h);
            } else {
                image(this.asset, this.x, this.y, this.w, this.h);
            }
        }
        if (!playersound.isPlaying()){
            this.setSpeed(this.speedScalar);
        }
    }
    /**
     * Setea la velocidad del jugador
     * @param {number} speed Velocidad deseada
     */
    setSpeed(speed) {
        let __defSpeedScalar = 5;
        if (speed == undefined) {
            this.speedScalar = __defSpeedScalar;
        } else {
            this.speedScalar = speed;
        }
        setCarSound(this.speedScalar);
    }

    /**
     * Normaliza la velocidad del enemigo al moverse en diagonal
     */
    normalizeSpeed() {
        this.speedScalar = this.speedScalar / 1.5;
    }
}