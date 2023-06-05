var keyInput = new KeyInput();

$(function(){
    var fps = 60;
    keyInput.Listen();

    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");

    setup(ctx, canvas);
    //draw(ctx, canvas);
    setInterval(draw, 1000/fps, ctx, canvas);
});

var playerX = 0;
var playerY = 0;
var bg = new Image();
var bgLoaded = false;
var car = new Image();
var carLoaded = false;


function setup(ctx, canvas){
    playerX = 165;
    playerY = canvas.height-30;
    bg = new Image(); 
    bg.src = './assets/demo_bg.png'; 
    bg.onload = () => {   
        bgLoaded = true;
    };
    car = new Image(); 
    car.src = './assets/car.png'; 
    car.onload = () => {   
        carLoaded = true;
    };

    console.log('setup finished...');
    console.log(canvas);
    console.log(ctx);
}

function draw(ctx, canvas){
    clearCanvas(ctx, canvas);
    drawBackground(ctx);
    drawPlayer(ctx, playerX, playerY);
    detectKeyboard();
    playerLimits(canvas);
    //requestAnimationFrame(function(){
    //    draw(ctx, canvas);
    //}); 
}

function clearCanvas(ctx, canvas){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer(ctx, x, y) {
    //ctx.drawImage(car, x, y);
    ctx.drawImage(car,0,0,car.width,car.height,x,y,55,100);
    // ctx.beginPath();
    // ctx.arc(x, y, 10, 0, Math.PI*2);
    // ctx.fillStyle = "#0095DD";
    // ctx.fill();
    // ctx.closePath();
}

function playerLimits(canvas) {
    var minX = 90;
    var maxX = canvas.width - 145;
    var minY = 20;
    var maxY = canvas.height - 105;

    if (playerX < minX) playerX = minX;
    if (playerX > maxX) playerX = maxX;
    if (playerY < minY) playerY = minY;
    if (playerY > maxY) playerY = maxY;

}

function drawBackground(ctx){
    if (bgLoaded){  
        ctx.drawImage(bg, 0, 0);
    }
}

function detectKeyboard() {
    var velocityDef = 5;

    var velocity = velocityDef;

    keyInput.OnKeyPressed(() => {
        velocity = velocityDef + 5;
    }, 'ShiftLeft');

    keyInput.OnKeyPressed(() => {
        playerY -= velocity;
    }, 'KeyW', 'ArrowUp');

    keyInput.OnKeyPressed(() => {
        playerY += velocity;
    }, 'KeyS', 'ArrowDown');

    keyInput.OnKeyPressed(() => {
        playerX -= velocity;
    }, 'KeyA', 'ArrowLeft');

    keyInput.OnKeyPressed(() => {
        playerX += velocity;
    }, 'KeyD', 'ArrowRight');

}