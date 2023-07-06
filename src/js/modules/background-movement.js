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

//carga el bg con la imagenes proporcionadas
function loadBackground(bg, images){
    images.forEach(element => {
        bg.addAsset(loadImage(element)); 
    });
}

function loadBackgroundA(){
    loadBackground(__bgA, loadNameFilesInversed("assets/bg/BGB",0,299,"jpg"));
}

function loadBackgroundB(){
    __bgB = new Backgrond(2, 4000);
    __bgB.addAsset(loadImage("assets/bg/bge.png")); 
}
