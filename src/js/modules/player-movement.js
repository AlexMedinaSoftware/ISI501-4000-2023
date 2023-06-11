let __xProta = 200;
let __yProta = 200;
let __wProta = 80;
let __hProta = 140;
let __prota;
let __speedScalar = 5;
let __nitro = false;

const __screenLimits = {
    Left: 110,
    Right: 110,
    Top: 10,
    Bottom: 150
};

Object.freeze(__screenLimits);
Object.freeze(__wProta);
Object.freeze(__hProta);

function loadProta(){
  __prota = loadImage("assets/Auto_Prota.png");
}

function showPlayer(){
  //detecta si se presiono alguna tecla __yProta mueve al personaje
  detectKey();
  
  //muestra la imegen del protagonista en la posicion __xProta, __yProta
  image(__prota ,__xProta, __yProta, __wProta, __hProta)
}

function setPlayerSpeed(speed){
    let __defSpeedScalar = 5;
    if (speed == undefined){
        __speedScalar = __defSpeedScalar;
    }else{
        __speedScalar = speed;
    }
}

//funcion para mover al personaje
function detectKey() {
    return new Promise(resolve => {
      if (keyIsDown(LEFT_ARROW)) {
        __xProta -= __speedScalar;
      }
  
      if (keyIsDown(RIGHT_ARROW)) {
        __xProta += __speedScalar;
      }
  
      if (keyIsDown(UP_ARROW)) {
        __yProta -= __speedScalar;
      }
  
      if (keyIsDown(DOWN_ARROW)) {
        __yProta += __speedScalar;
      }

      if (keyIsDown(SHIFT)) {
        setPlayerSpeed(8);
        __nitro = true;
      }else{
        setPlayerSpeed();
        __nitro = false;
      }
      
      detectLimits();

      resolve('resolved');
    });
}

function detectLimits(){
    if (__xProta < __screenLimits.Left) __xProta = __screenLimits.Left; 
    if (__xProta > width - __screenLimits.Right - __wProta) __xProta = width - __screenLimits.Right - __wProta; 
    
    if (__yProta < __screenLimits.Top) __yProta = __screenLimits.Top; 
    if (__yProta > height - __screenLimits.Bottom - __hProta) __yProta = height - __screenLimits.Bottom - __hProta; 
}