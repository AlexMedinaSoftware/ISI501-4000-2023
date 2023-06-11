class Character {

    x = 200;
    y = 200;
    w = 80;
    h = 140;
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

    loadCharacter(img, imgL, imgR) {
        this.asset = loadImage(img);
        if (imgL != undefined) this.assetL = loadImage(imgL);
        if (imgR != undefined) this.assetR = loadImage(imgR);
    }

    showCharacter(angle = 0) {
        if (angle == 0){
            image(this.asset, this.x, this.y, this.w, this.h);
        }else if (angle < 0){
            if (this.assetL != undefined){
                image(this.assetL, this.x, this.y, this.w, this.h);
            }else{
                image(this.asset, this.x, this.y, this.w, this.h);
            }
        }else if (angle > 0){
            if (this.assetR != undefined){
                image(this.assetR, this.x, this.y, this.w, this.h);
            }else{
                image(this.asset, this.x, this.y, this.w, this.h);
            }
        }
    }

    setCharacterSpeed(speed) {
        let __defSpeedScalar = 5;
        if (speed == undefined) {
            this.speedScalar = __defSpeedScalar;
        } else {
            this.speedScalar = speed;
        }
    }

    normalizeCharacterSpeed() {
        this.speedScalar = this.speedScalar / 1.5;
    }
}