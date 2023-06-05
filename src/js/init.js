var keyInput = new KeyInput();

$(function(){
    var fps = 90;
    keyInput.Listen();

    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");

    mainLoop(fps, ctx, canvas);
    loadCarMinigame();
});

var loadScene = false;
var loadedScene = new Scene();

function changeScene(scene){
    loadedScene = scene;
    loadScene = true;
}

function mainLoop(fps, ctx, canvas){
    setInterval(function(){
        var actualScene;
        if (loadScene){
            loadScene = false;
            var scene = loadedScene;
            try { clearInterval(actualScene); } catch(ex) { console.log('No loaded scene.') }
            scene.setup(ctx, canvas);
            actualScene = setInterval(scene.draw, 1000/fps, ctx, canvas, scene);
        }
    },  1000);
}

function loadCarMinigame(){
    var scene = new CarMinigame('Car MiniGame');
    changeScene(scene);
}