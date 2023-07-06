var pause = false;
var runTutorial = false;

function sceneGame() {
    var bgVelocity = getBackgroundVelocity();
    //muesta el background
    __bgDisplayed.draw(bgVelocity);

    //muestra el jugador
    showPlayer();

    //muestra los enemigos
    showEnemies();

    //agrega el rectangulo de abajo para guardar espacio para los kilometros y la bencina
    fill(255, 204, 0);
    rect(0, 650, 700, 150);

    gameLevel();

    //muestra la info del juego
    showGameInfo();
}


function sceneTutorial() {
    var bgVelocity = getBackgroundVelocity();
    //muesta el background
    __bgDisplayed.draw(bgVelocity);

    //muestra el jugador
    showPlayer();

    //muestra los enemigos
    //showEnemies();

    //agrega el rectangulo de abajo para guardar espacio para los kilometros y la bencina
    fill(255, 204, 0);
    rect(0, 650, 700, 150);

    gameLevel();

    //muestra la info del juego
    showGameInfo();

    //image(__video, 0, 200, width, height - 400, 0, 0, 1920, 1080);
}




function sceneOver() {
    push();
    background(0);
    textSize(46);
    fill(255);
    stroke(255);
    text(" DISTANCE: " + __kmsDistance.toFixed(0) + " kms", width / 4, (height / 2) - 100)
    text(" GAME OVER", width / 4, height / 2);
    text("          " + (5 - timeInScene().toFixed(0)), width / 4, height - 100);
    pop();
}

var sceneVideoFirst = true;
function sceneVideo() {
    push();
    background(0);
    textSize(46);
    fill(255);
    stroke(255);
    text("CLICK TO PLAY", width / 4, height / 2);
    image(__video, 0, 200, width, height - 400, 0, 0, 1920, 1080);
    if (__videoEnded) {
        changeScene(1);
        resetGameScene();
    }
    if (sceneVideoFirst) {
        setupVideoScene();
        sceneVideoFirst = false;
        __video.play();
    }

    if (__video.time() == 0) {
        __video.play();
    }
    skipVideo.draw();
    pop();
}

var hoverPlay = false;
function sceneMenu() {
    push();
    background(0); // Fondo negro para el menú

    // Dibujar elementos del menú, como títulos, botones, etc.
    fill(255);
    textSize(32);
    textAlign(CENTER);
    image(__logoImage, 0, 200, 700, 116, 0, 0, 754, 116);

    if (mouseX > width / 2 - 75 && mouseX < width / 2 + 75 && mouseY > height / 2 && mouseY < height / 2 + 40) {
        fill(255, 0, 0); // Resaltar el botón cuando el cursor está sobre él
        if (!hoverPlay) {
            hoverPlay = true;
            onFocusedMenu();
        }
        if (mouseIsPressed) {
            onClickMenu();
            // Redireccionar al juego cuando se hace clic en el botón "Jugar"
            stopMenuSound();
            if (runTutorial){
                changeScene(5);
            }else{
                changeScene(2);
            }
        }
    } else {
        hoverPlay = false;
        fill(255); // Color normal del botón
    }
    rect(width / 2 - 75, height / 2, 150, 40);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Jugar", width / 2, height / 2 + 20);
    pop();
}


function gameLevel() {
    //Este if crea enemigos si el jugador está del lado izquierdo de la pantalla
    if (__prota.x.toFixed(0) >= 110 && __prota.x.toFixed(0) <= 309 && __prota.y.toFixed(0) >= 10 && __prota.y.toFixed(0) <= 570) {
        __spawnPositions = [115, 155, 215, 257, 335];
    }
    //Este if crea enemigos si el jugador está del lado  derecho de la pantalla
    else if (__prota.x.toFixed(0) >= 310 && __prota.x.toFixed(0) <= 540 && __prota.y.toFixed(0) >= 10 && __prota.y.toFixed(0) <= 570) {
        __spawnPositions = [367, 420, 440, 472, 535];
    }
    else {
        var def = Object.assign(Object.create(Object.getPrototypeOf(__defSpawnPositions)), __defSpawnPositions)
        __spawnPositions = def;
    }

    // Estos if aumentan la cantidad de enemigos en la pantalla según la distancia recorrida
    if (__kmsDistance < 30) {
        __maxChoro = 2;
        __maxPerkin = 3;
        __maxFuel = 2;
    }
    if (__kmsDistance >= 30 && __kmsDistance < 50) {
        __maxChoro = 4;
        __maxPerkin = 5;
        __maxFuel = 2;
    }
    if (__kmsDistance >= 50 && __kmsDistance < 70) {
        __maxChoro = 6;
        __maxPerkin = 7;
        __maxFuel = 2;
    }
    if (__kmsDistance >= 70 && __kmsDistance < 90) {
        __maxChoro = 8;
        __maxPerkin = 9;
        __maxFuel = 2;
    }
    if (__kmsDistance > 100) {
        __maxChoro = 10;
        __maxPerkin = 11;
        __maxFuel = 1;
    }
}

function pauseGame(){
    onClickMenu();
    if (pause) {
        noLoop();
    } else {
        loop();
    }
}