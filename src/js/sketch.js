
var bgA = new Array();
var prota;
var bgFrame = 1;
var frames = 0;
var X = 200
var Y = 200
var SpeedScalar = 5;
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

  prota = loadImage("assets/Auto_Prota.png");
  blank = loadImage("assets/blank.png");

}

function setup() {
  //seteamos el fondo a para mostrarlo
  bgDisplayed = bgA;
  createCanvas(700, 800);
  frameRate(60);
}

function draw() {
  //guarda los frames transcurridos para hacer calculos
  frames++;

  //cada 3 frames del juego avanza un frame del fondo
  if (frames % 1 == 0){
    bgFrame++;
  }
  
  //como hay 9 frames en el fondo
  //si el conteo es mayor a 9 se establece a 1 y vuelve al primer frame
  if (bgFrame > 9){
    bgFrame = 1;
  }

  //muesta la imagen de fondo
  image(getFrame(bgFrame), 0, 0, 700, 900);

  //muestra la imegen del protagonista en la posicion x, y
  //image(prota ,X, Y, 80, 140)

  //agrega el rectangulo de abajo para guardar espacio para los kilometros y la bencina
  fill(255, 204, 0);
  rect(0, 650, 700, 100)

  //detecta si se presiono alguna tecla y mueve al personaje
  detectKey();
}


//funcion para mover al personaje
function detectKey() {
  if (keyIsDown(LEFT_ARROW)) {
    X -= 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    X += 5;
  }

  if (keyIsDown(UP_ARROW)) {
    Y -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    Y += 5;
  }
}

//funcion para decidir el frame del fondo a mostrar
//TODO: hay que optimizar esto con un array.
//FondoA[0] = loadImage("assets/bg1.jpg");
function getFrame(index){
  return bgDisplayed[index-1];
}