let __gameVelocity = 1;
let __kmsDistance = parseFloat(0);
let __startGameInfo;
let __maxGameVelocity = 6;
let __bencina = 100;

Object.freeze(__maxGameVelocity);

function retrieveGameInfo(){
    if (__startGameInfo == undefined) __startGameInfo = 0;

    let giEnd = millis();
    let elapsed = giEnd - __startGameInfo;
    let km = parseFloat(elapsed) / parseFloat(5000) * parseFloat(__gameVelocity);
    __kmsDistance = parseFloat(__kmsDistance) + parseFloat(km);
    //CAMBIO!!
    __bencina -= km * 2;
    __startGameInfo = millis();
}

function showGameInfo(){
    retrieveGameInfo();
    fill(0);
    stroke(155);
    text("KMS: " + __kmsDistance.toFixed(0), width - 120, height - 130);
    text("Map Speed: " + gameVelocity() + " / " + 6, width - 120, height - 115);
    text("Player Speed: " + __prota.speedScalar.toFixed(1), width - 120, height - 100);
    text("Player Pos: " + __prota.x.toFixed(0) + " | " + __prota.y.toFixed(0), width - 120, height - 85);
    text("Nitro: " + __nitro, width - 120, height - 70);
    text("Max Choro: " + __maxChoro, width - 120, height - 55);
    text("Max Perkin: " + __maxPerkin, width - 120, height - 40);
    // Este contador permite la mecánica de que cuando acaba la bencina el juego se acaba
    //CAMBIO!!
    text("Fuel: " +  (__bencina.toFixed(0)), width - 120, height - 25);
}

function gameVelocity(velocity){
    if (velocity == undefined){
        return __gameVelocity;
    }else{
        if (velocity > __maxGameVelocity) velocity = __maxGameVelocity;
        __gameVelocity = velocity;
    }
}

function getBackgroundVelocity(){
    return (__maxGameVelocity + 1) - __gameVelocity;
}
