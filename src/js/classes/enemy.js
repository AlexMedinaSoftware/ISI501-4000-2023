/**
 * Clase Enemy
 * @property {number} x Posicion en x
 * @property {number} y Posicion en y
 * @property {number} w Ancho
 * @property {number} h Alto
 */
class Enemy {

    x = 200;
    y = 200;
    w = 80; //80
    h = 140; //140
    asset;
    assetL;
    assetR;
    type = 1;
    preangle = 0;

    /**
     * Genera el prototipo de un nuevo enemigo
     * @param {object} Opciones Configuracion del enemigo
     */
    constructor({w, h, type, speed}) {
        if (w == undefined) w = 80;
        if (h == undefined) h = 140;
        if (type == undefined) type = 1;
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
     * Precarga los assets del enemigo
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
     * Dibuja el enemigo en pantalla
     */
    draw() {
        if (this.preangle == 0){
            image(this.asset, this.x, this.y, this.w, this.h);
        }else if (this.preangle < 0){
            if (this.assetL != undefined){
                image(this.assetL, this.x, this.y, this.w, this.h);
            }else{
                image(this.asset, this.x, this.y, this.w, this.h);
            }
        }else if (this.preangle > 0){
            if (this.assetR != undefined){
                image(this.assetR, this.x, this.y, this.w, this.h);
            }else{
                image(this.asset, this.x, this.y, this.w, this.h);
            }
        }
    }

    /**
     * Mueve el enemigo en pantalla segun su tipo
     * @param {Character} player Objeto jugador
     * @param {number} dir Constante de movimiento DIR_UP o DIR_DOWN
     */
    move(player, dir = DIR_DOWN) {
        var amount = this.speedScalar;
        if (dir == DIR_UP) amount * -1;


        if (this.type == 1) {
            this.y += amount;
        }

        if (this.type == 2) {
            this.preangle = 0;
            this.y += amount;
            if (this.y - player.h < player.y) {
                if (player.x < this.x) {
                    this.x -= 1;
                    this.preangle = 1;
                }
                if (player.x > this.x) {
                    this.x += 1;
                    this.preangle = -1;
                }
            }
        }
    }

    /**
     * Setea la velocidad del enemigo
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
     * Normaliza la velocidad del enemigo al moverse en diagonal
     */
    normalizeSpeed() {
        this.speedScalar = this.speedScalar / 1.5;
    }
}