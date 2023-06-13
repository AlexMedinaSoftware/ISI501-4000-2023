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


function sceneMenu() {
    push();
    background(0); // Fondo negro para el menú
  
    // Dibujar elementos del menú, como títulos, botones, etc.
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("Chilean MadMax", width / 2, height / 2 - 100);
  
    
    if (mouseX > width / 2 - 75 && mouseX < width / 2 + 75 && mouseY > height / 2 && mouseY < height / 2 + 30) {
      fill(255, 0, 0); // Resaltar el botón cuando el cursor está sobre él
      if (mouseIsPressed) {
         // Redireccionar al juego cuando se hace clic en el botón "Jugar"
         changeScene(2);
      }
    } else {
      fill(255); // Color normal del botón
    }
    rect(width / 2 - 75, height / 2, 150, 40); 
    fill(0);
    textAlign(CENTER, CENTER);
    text("Jugar", width / 2, height / 2 + 20);
    pop();
  }
  