function preload() {
  //cargamos el fondo A
  loadBackgroundA();

  //imagen de referencia en blanco
  blank = loadImage("assets/blank.png");

  //cargamos al protagonista
  loadProta();

  //cargamos los enemigos
  loadEnemies();
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

//scene 0: LOGO
//scene 1: MENU
//scene 2: GAME
//scene 3: GAME OVER
//scene 4: VIDEO
var currentScene = 1;
var lastChange = 0;

function draw() {
  switch (currentScene) {
    case 1:
      sceneMenu();
      break;
    case 2:
      sceneGame();
      break;
    case 3:
      sceneOver();
      break;
    default:
      break;
  }

  alternateScene();

  //muestra los informacion de desarrollo en pantalla... mantener al final de draw
  showDevInfo();
}

function changeScene(number){
  lastChange = millis();
  currentScene = number;
}

function alternateScene(){
  if (currentScene == 3){
    if ((millis() - lastChange) > 5000){
      changeScene(1);
      resetGameScene();
    }
  }
}

function timeInScene(){
  return (millis() - lastChange) / 1000;
}

function resetGameScene(){
  __prota.x = 307;
  __prota.y = 510;

  __screenEnemies = [];
  __startGameInfo = millis();
  __kmsDistance = parseFloat(0);
  gameVelocity(5);
  __bencina = 100;
}
// Esta función hace que el juego termine si la bencina llega a 0
function empty(){
  if((__bencina.toFixed(0)) <= 0){
      changeScene(3);
      return;
  }
}

