function sceneGame(){
    var bgVelocity = getBackgroundVelocity();
    //muesta el background
    __bgDisplayed.showBackground(bgVelocity);
  
    //muestra el jugador
    showPlayer();
  
    //muestra los enemigos
    showEnemies();
  
    //agrega el rectangulo de abajo para guardar espacio para los kilometros y la bencina
    fill(255, 204, 0);
    rect(0, 650, 700, 150)
  
    //muestra la info del juego
    showGameInfo();
}

function sceneOver(){
    push();
    background(0);
    textSize(46);
    fill(255);
    stroke(255);
    text("GAME OVER", width/4, height/2);
    text("          " + (5 - timeInScene().toFixed(0)), width/4, height-100);
    pop();
}

