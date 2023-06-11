function preload() {
  //cargamos el fondo A
  loadBackgroundA();
  //imagen de referencia en blanco
  blank = loadImage("assets/blank.png");
  //cargamos al protagonista
  loadProta();
}

function setup() {
  //corre la funcion para optimiza p5.js
  optimize();
  //seteamos el fondo a para mostrarlo
  __bgDisplayed = __bgA;
  //creamos el fondo del juego
  createCanvas(700, 800);
  //seteamos la velocidad del juego en 5
  gameVelocity(5);
}

function draw() {
  var bgVelocity = getBackgroundVelocity();
  //muesta el background
  __bgDisplayed.showBackground(bgVelocity);

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



