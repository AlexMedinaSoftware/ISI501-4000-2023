let __nitro = false;
let __turn = false;
let __prota = new Character();

const __screenLimits = {
  Left: 110,
  Right: 110,
  Top: 10,
  Bottom: 150
};

Object.freeze(__screenLimits);

function loadProta() {
  __prota.load("assets/ProtaN.webp", "assets/ProtaL.webp", "assets/ProtaR.webp");
}

function showPlayer() {
  //detecta si se presiono alguna tecla __prota.y mueve al personaje
  detectKey();

  //muestra la imegen del protagonista en la posicion __prota.x, __prota.y
  __prota.draw(__turn);
}

//funcion para mover al personaje
function detectKey() {
  return new Promise(resolve => {
    __turn = 0;
    __presedUD = false;
    __presedLR = false;
    if (keyIsDown(LEFT_ARROW)) {
      __prota.x -= __prota.speedScalar;
      __turn = -1;
      __presedLR = true;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      __prota.x += __prota.speedScalar;
      __turn = 1;
      __presedLR = true;
    }

    if (keyIsDown(UP_ARROW)) {
      __prota.y -= __prota.speedScalar;
      __presedUD = true;
    }

    if (keyIsDown(DOWN_ARROW)) {
      __prota.y += __prota.speedScalar;
      __turn = __turn * -1;
      __presedUD = true;
    }

    if (keyIsDown(SHIFT)) {
      __prota.setSpeed(8);
      __nitro = true;
    } else {
      __prota.setSpeed();
      __nitro = false;
    }

    if (__presedLR && __presedUD) {
      __prota.normalizeSpeed();
    }

    detectLimits();

    resolve('resolved');
  });
}

function detectLimits() {
  if (__prota.x < __screenLimits.Left) {
    __prota.x = __screenLimits.Left;
    __turn = 0;
  }

  if (__prota.x > width - __screenLimits.Right - __prota.w) {
    __prota.x = width - __screenLimits.Right - __prota.w;
    __turn = 0;
  }

  if (__prota.y < __screenLimits.Top) __prota.y = __screenLimits.Top;
  if (__prota.y > height - __screenLimits.Bottom - __prota.h) __prota.y = height - __screenLimits.Bottom - __prota.h;
}