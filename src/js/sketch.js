var bgA = new Array();
var bgFrame = 1;
var frames = 0;
var blank;
var bgDisplayed;

function preload(){
  //cargamos el fondo A
  bgA.push(loadImage("assets/bg1.jpg"));
  bgA.push(loadImage("assets/bg2.jpg"));
  bgA.push(loadImage("assets/bg3.jpg"));
  bgA.push(loadImage("assets/bg4.jpg"));
  bgA.push(loadImage("assets/bg5.jpg"));
  bgA.push(loadImage("assets/bg6.jpg"));
  bgA.push(loadImage("assets/bg7.jpg"));
  bgA.push(loadImage("assets/bg8.jpg"));
  bgA.push(loadImage("assets/bg9.jpg"));

  blank = loadImage("assets/blank.png");
  loadProta();
}

function setup() {
  //corre la funcion para optimiza p5.js
  optimize();
  //seteamos el fondo a para mostrarlo
  bgDisplayed = bgA;
  createCanvas(700, 800);
  gameVelocity(6);
}

function draw() {
  //guarda los frames transcurridos para hacer calculos
  frames++;

  //cada n frames del juego avanza un frame del fondo
  if (frames % getBackgroundVelocity() == 0){
    bgFrame++;
  }
  
  //como hay 9 frames en el fondo
  //si el conteo es mayor a 9 se establece a 1 y vuelve al primer frame
  if (bgFrame > 9){
    bgFrame = 1;
  }

  //muesta la imagen de fondo
  image(getFrame(bgFrame), 0, 0, 700, 900);

  //muestra el jugador
  showPlayer();

  //agrega el rectangulo de abajo para guardar espacio para los kilometros y la bencina
  fill(255, 204, 0);
  rect(0, 650, 700, 100)

  //muestra la info del juego
  showGameInfo();

  //muestra los informacion de desarrollo en pantalla... mantener al final de draw
  showDevInfo();
}

//funcion para decidir el frame del fondo a mostrar
function getFrame(index){
  return bgDisplayed[index-1];
}



