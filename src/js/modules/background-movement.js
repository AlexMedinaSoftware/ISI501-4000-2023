var blank;

//aqui se guardan los backgrounds
var __bgB = new Backgrond();
var __bgA = new Backgrond();

//background mostrado actualmente
var __bgDisplayed;

//carga el bg con la imagenes proporcionadas
function loadBackground(bg, ...images){
    images.forEach(element => {
        bg.addAsset(loadImage(element)); 
    });
}

function loadBackgroundA(){
    loadBackground(__bgA, "assets/bg1.jpg", "assets/bg2.jpg", "assets/bg3.jpg", "assets/bg4.jpg", "assets/bg5.jpg", "assets/bg6.jpg", "assets/bg7.jpg", "assets/bg8.jpg", "assets/bg9.jpg");
}
