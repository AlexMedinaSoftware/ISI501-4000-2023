class Backgrond {
    frames = 0;
    assets = new Array();
    bgFrame = 1;
    type = 1;
    x = 0;
    h = 0;

    constructor(_type, _h) {
        if (_type == undefined) _type = 1;
        if (_h == undefined) _h = 4000;
        this.type = _type;
        this.h = _h;
    }

    addAsset(image) {
        this.assets.push(image);
    }

    draw(velocity) {
        //guarda los frames transcurridos para hacer calculos
        this.frames++;

        if (this.type == 2){
            this.x += velocity;
            if (this.x >= this.h - 800) this.x = 0;
            image(this.getFrame(1), 0, (this.h - 800 - this.x) * -1, 700, this.h);
        }
        

        if (this.type == 1){

            //cada n frames del juego avanza un frame del fondo
            if (this.frames % velocity == 0) {
                this.bgFrame++;
            }

            //como hay 9 frames en el fondo
            //si el conteo es mayor a 9 se establece a 1 y vuelve al primer frame
            if (this.bgFrame > this.assets.length) {
                this.bgFrame = 1;
            }

            //muesta la imagen de fondo
            image(this.getFrame(this.bgFrame), 0, 0, 700, 900);
        }

    }

    //funcion para decidir el frame del fondo a mostrar
    getFrame(index) {
        return this.assets[index - 1];
    }
}