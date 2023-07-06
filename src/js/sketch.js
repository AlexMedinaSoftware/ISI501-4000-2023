let __logoImage;

function preload() {
  //cargamos el fondo A
  loadBackgroundB();

  //imagen de referencia en blanco
  blank = loadImage("assets/blank.png");
  __logoImage = loadImage("assets/logo.png");

  //cargamos al protagonista
  loadProta();

  //cargamos los enemigos
  loadEnemies();

  //cargamos el video
  loadVideoScene();

  //cargamos los sonidos
  loadSounds();
}

var skipVideo;
function setup() {
  //corre la funcion para optimiza p5.js
  optimize();
  //seteamos el fondo a para mostrarlo
  __bgDisplayed = __bgB;
  //creamos el fondo del juego
  createCanvas(700, 800);
  //seteamos la velocidad del juego en 5
  gameVelocity(5);

  skipVideo = new Button({
    x: width - 50, y: height - 25,
    width: 80, height: 30,
    align_x: 0, align_y: 0,
    content: 'Skip',
    on_press() {
      changeScene(1);
      __video.stop();
    }
  });

}

//scene 0: LOGO
//scene 1: MENU
//scene 2: GAME
//scene 3: GAME OVER
//scene 4: VIDEO
//scene 5: TUTORIAL
var currentScene = 4;
var lastChange = 0;

function draw() {
  switch (currentScene) {
    case 0:
      break;
    case 1:
      sceneMenu();
      break;
    case 2:
      sceneGame();
      break;
    case 3:
      sceneOver();
      break;
    case 4:
      sceneVideo();
      break;
    case 5:
      sceneTutorial();
      break;
    default:
      break;
  }

  alternateScene();

  //muestra los informacion de desarrollo en pantalla... mantener al final de draw
  showDevInfo();
}

function changeScene(number) {
  pauseBtn.hidden = true;
  lastChange = millis();
  currentScene = number;

  stopGameplaySound();
  stopMenuSound();

  if (number == 1) {
    playMenuSound();
  }

  if (number == 2 || number == 5) {
    playGameplaySound();
    resetGameScene();
    pauseBtn.hidden = false;
  }

  if (number == 3) {
    wastedSound();
  }
}

function alternateScene() {
  //si lleva mas de 3 segs en la escena 0 (blank) cambia al menu
  if (currentScene == 0) {
    if ((millis() - lastChange) > 3000) {
      changeScene(1);
    }
  }

  //si lleva mas de 5 segs en la escena 3 (game over) cambia al menu
  if (currentScene == 3) {
    if ((millis() - lastChange) > 5000) {
      changeScene(1);
    }
  }
}

function timeInScene() {
  return (millis() - lastChange) / 1000;
}

function resetGameScene() {
  __prota.x = 307;
  __prota.y = 510;

  __screenEnemies = [];
  __startGameInfo = millis();
  __kmsDistance = parseFloat(0);
  gameVelocity(5);
  __bencina = 100;
}

// Esta función hace que el juego termine si la bencina llega a 0
function empty() {
  if ((__bencina.toFixed(0)) <= 0) {
    changeScene(3);
    return;
  }
}