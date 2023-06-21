var menusound;
var gameplaysound0;
var gameplaysound1;
var gameplaysound2;
var alertsound;
var carsound0;
var carsound1;
var carsound2;
var carsound3;
var carsound4;
var carsound5;
var coin0;
var coin1;
var menu0;
var menu1;
var pastero0;
var pastero1;
var wasted;
var speed = 0;


var gameplaysound;
var playersound;



var volume = {
    menu: 0.1,
    game: 0.2,
    sounds: 1,
}

function loadSounds(){
    soundFormats('wav');
    //Menu Background
    menusound = loadSound('sounds/Soundtrack/Menu_01.mp3');
    //Gameplay soundtrack
    gameplaysound0 = loadSound('sounds/Soundtrack/gameplay01.mp3');
    gameplaysound1 = loadSound('sounds/Soundtrack/gameplay02.mp3');
    gameplaysound2 = loadSound('sounds/Soundtrack/gameplay03.mp3');
    //Alert
    alertsound = loadSound('sounds/BancoFoley/alert/alert01.wav');
    //Car
    carsound0 = loadSound('sounds/BancoFoley/auto/loop_0.wav');
    carsound1 = loadSound('sounds/BancoFoley/auto/loop_1.wav');
    carsound2 = loadSound('sounds/BancoFoley/auto/loop_2.wav');
    carsound3 = loadSound('sounds/BancoFoley/auto/loop_3.wav');
    carsound4 = loadSound('sounds/BancoFoley/auto/loop_4.wav');
    carsound5 = loadSound('sounds/BancoFoley/auto/loop_5.wav');
    //Coins
    coin0 = loadSound('sounds/BancoFoley/coins/Coin01.wav');
    coin1 = loadSound('sounds/BancoFoley/coins/Coin2.wav');
    //Menu
    menu0 = loadSound('sounds/BancoFoley/menu/menu01.wav');
    menu1 = loadSound('sounds/BancoFoley/menu/menu05.wav');
    //Pastero
    pastero0 = loadSound('sounds/BancoFoley/pastero/pastero01.wav');
    pastero1 = loadSound('sounds/BancoFoley/pastero/pastero02.wav');

    wasted = loadSound('sounds/others/wasted.mp3');
}

function playMenuSound(){
    menusound.loop();
    menusound.setVolume(volume.menu);
}
function stopMenuSound(){
    try{
        menusound.stop();
    }catch{}
}

function playGameplaySound(){
    gameplaysound = random([gameplaysound0, gameplaysound1, gameplaysound2]);
    gameplaysound.loop();
    gameplaysound.setVolume(volume.game);
    playersound = carsound4;
}

function stopGameplaySound(){
    try{
        gameplaysound.stop();
        playersound.stop();
    }catch{}
}

function coinSound(){
    var coins = random([coin0,coin1]);
    coins.setVolume(volume.sounds);
    coins.play();
}

function wastedSound(){
    wasted.setVolume(volume.sounds);
    wasted.play();
}

function onFocusedMenu(){
    menu0.setVolume(volume.sounds);
    menu0.play();
}

function onClickMenu(){
    menu1.setVolume(volume.sounds);
    menu1.play();
}

function setCarSound(speed){
    var newSound;
    switch(Math.floor(speed)){
        case 3:
        case 4:
        case 5:
            newSound = carsound1;
            break
        case 6:
        case 7:
        case 8:
            newSound = carsound5;
            break
        default:
        break
    }

    if (newSound != playersound){
        playersound.stop();
        playersound = newSound;
        playersound.loop();
    }

}

function pasteroSound1(){
    pastero0.play();
}

function pasteroSound2(){
    pastero1.play();
}