class Backgrond {
    frames = 0;
    assets = new Array();
    bgFrame = 1;

    addAsset(image) {
        this.assets.push(image);
    }

    showBackground(velocity) {
        //guarda los frames transcurridos para hacer calculos
        this.frames++;

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

    //funcion para decidir el frame del fondo a mostrar
    getFrame(index) {
        return this.assets[index - 1];
    }
}