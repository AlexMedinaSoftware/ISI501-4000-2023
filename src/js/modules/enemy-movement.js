var __enemy_perkin;
var __enemy_choro;
var __enemy_explosion;
var __enemy_fuel;
var __enemy_tuneao;

var __screenEnemies = [];
var __defSpawnPositions = [115, 155, 215, 257, 335, 367, 410, 430, 450, 472, 535];
var __spawnPositions = [115, 155, 215, 257, 335, 367, 410, 430, 450, 472, 535];

var __maxPerkin = 3;
var __maxChoro = 2;
var __maxFuel = 2;
var __maxTuneao = 2;

var __probPerkin = 70;
var __probChoro = 60;
var __probFuel = 40;
var __probTuneao = 30;

var lastGeneration = 0;

/**
 * Realiza la precarga de los assets y los prototipos, para los enemigos
 */
function loadEnemies() {
    __enemy_perkin = new Enemy({type: 1, speed: 6});
    __enemy_perkin.load("assets/perkin/YARISC.png", "assets/perkin/YARISL.png", "assets/perkin/YARISR.png");

    __enemy_choro = new Enemy({type: 2, speed: 7});
    __enemy_choro.load("assets/choro/IMPREZAC.png", "assets/choro/IMPREZAL.png", "assets/choro/IMPREZAR.png");

    __enemy_tuneao = new Enemy({type: 3, speed: 10});
    __enemy_tuneao.load("assets/tuneao/SUVC.png", "assets/tuneao/SUVL.png", "assets/tuneao/SUVR.png");

    __enemy_fuel = new Fuel({type: 5, speed: 9});
    __enemy_fuel.loadAnim(loadNameFiles("assets/fuel/barril",0,5,"png"));

    __enemy_explosion = new Explosion({type: 6, speed: 6});
    __enemy_explosion.load(loadNameFiles("assets/boom/boom_",0,32,"png"));   
    
}

/**
 * Se encarga de procesar la aparicion de nuevos enemigos en pantalla
 */
function processEnemies() {
    var secs = (millis() / 1000).toFixed(0);
    if ((secs % 1) == 0 && lastGeneration != secs) {
        lastGeneration = secs;
        var prob = getRandomProbability();

        if (prob < __probPerkin) {
            var e = Object.assign(Object.create(Object.getPrototypeOf(__enemy_perkin)), __enemy_perkin)
            e.x = getRandomPositionX();
            e.y = -150;
            Object.seal(e);
            if (getCountEnemies(1) < __maxPerkin && notCollide(e)) {
                __screenEnemies.push(e);
            }
        }

        if (prob < __probChoro) {
            var e = Object.assign(Object.create(Object.getPrototypeOf(__enemy_choro)), __enemy_choro)
            e.x = getRandomPositionX();
            e.y = -150;
            Object.seal(e);
            if (getCountEnemies(2) < __maxChoro && notCollide(e)) {
                __screenEnemies.push(e);
            }
        }

        if (prob < __probTuneao) {
            var e = Object.assign(Object.create(Object.getPrototypeOf(__enemy_tuneao)), __enemy_tuneao)
            e.x = getRandomPositionX();
            e.y = -150;
            Object.seal(e);
            if (getCountEnemies(2) < __maxTuneao && notCollide(e)) {
                console.log("Generando tuneao");
                __screenEnemies.push(e);
            }
        }

        if (prob < __probFuel) {
            var e = Object.assign(Object.create(Object.getPrototypeOf(__enemy_fuel)), __enemy_fuel)
            e.x = getRandomPositionX();
            e.y = -150;
            Object.seal(e);
            if (getCountEnemies(5) < __maxFuel && notCollide(e)) {
                __screenEnemies.push(e);
            }
        }
    }
}

/**
 * Calcula las colisiones entre los enemigos y el jugador
 */
function calculePlayerCollitions() {
    __screenEnemies.forEach(enemy => {
        if (enemy.type !== 5 && enemy.type !== 6) {
            var hit = collideRectRect(enemy.x + 10, enemy.y + 10, enemy.w - 20, enemy.h - 20, __prota.x, __prota.y, __prota.w, __prota.h);
            if (hit) {
                changeScene(3);
                return;
            }
        }

        if (enemy.type == 5) {
            var hit = collideRectRect(enemy.x + 5, enemy.y + 5, enemy.w - 10, enemy.h - 10, __prota.x, __prota.y, __prota.w, __prota.h);
            if (hit) {
                removeEnemy(enemy);
                __bencina = __bencina + 15;
                if (__bencina > 100) __bencina = 100;
                coinSound();
                return;
            }
        }
    });
}

/**
 * Helper para el draw de la escena del juego, se encarga de procesar, mover, mostrar y eliminar los enemigos
 */
function showEnemies() {
    calculePlayerCollitions();
    processEnemies();
    collideEnemies();
    empty();
    moveEnemies();
    drawEnemies();
}

/**
 * Dibuja los enemigos en pantalla
 */
function drawEnemies() {
    __screenEnemies.forEach(enemy => {
        enemy.draw();
    });
}

/**
 * Ejecuta el movimiento de los enemigos en direccion hacia abajo, si se sale de los limites se elimina de memoria
 */
function moveEnemies() {
    __screenEnemies.forEach(enemy => {
        enemy.move(__prota, DIR_DOWN);
        if (enemy.y > height) removeEnemy(enemy);
    });
}

/**
 * Obtiene el index de una posicion aleatoria para el spawn de un enemigo, basado en el array __spawnPositions[]
 * 
 * @returns {number} Index del array de posibles posiciones
 */
function getRandomPositionX() {
    var index = Math.floor(Math.random() * 4);
    return __spawnPositions[index];
}

/**
 * Obtiene una probabilidad aleatoria entre 0 y 100, para determinar si se debe generar un enemigo de un tipo determinado
 * @returns {number} Probabilidad aleatoria
 */
function getRandomProbability() {
    var index = Math.floor(Math.random() * 101);
    return index;
}

/**
 * Obtiene la cantidad de enemigos de un tipo determinado en la pantalla
 * @param {number} type Tipo de enemigo 
 * @returns {number} Cantidad de enemigos
 */
function getCountEnemies(type = 0) {
    if (type == 0) return __screenEnemies.length;
    if (type != 0) {
        var count = 0;
        __screenEnemies.forEach(enemy => {
            if (enemy.type == type) count++;
        });
        return count;
    }
    return 0;
}

/**
 * Elimina un enemigo de la memoria, si es de tipo 1 o 2 se genera una explosion
 * @param {Enemy} enemy Enemigo a eliminar de la pantalla
 * @param {boolean} fromCollide Indica si se esta eliminando por la colision
 */
function removeEnemy(enemy, fromCollide = false) {
    var index = __screenEnemies.indexOf(enemy);
    if (index !== -1) {
        __screenEnemies.splice(index, 1);

        if (enemy.type != 5 && enemy.type != 6 && fromCollide) {
            var e = Object.assign(Object.create(Object.getPrototypeOf(__enemy_explosion)), __enemy_explosion);
            e.x = enemy.x;
            e.y = enemy.y;
            e.speedScalar = enemy.speedScalar;
            Object.seal(e);
            __screenEnemies.push(e);
        }
    }
}

/**
 * Calcula si el enemigo generado en la posicion x, y, colisiona con algun enemigo de la pantalla
 * @param {Enemy} aenemy Enemigo a comparar
 * @returns {boolean} 
 */
function notCollide(aenemy) {
    var collide = false;
    __screenEnemies.forEach(enemy => {
        var hit = collideRectRect(enemy.x + 10, enemy.y + 10, enemy.w - 20, enemy.h - 20, aenemy.x, aenemy.y, aenemy.w, aenemy.h);
        if (hit) collide = true;
    });
    return !collide;
}


/**
 * Calcula las colisiones entre los enemigos, si existe una colision se llama a removeEnemy()
 */
function collideEnemies() {
    __screenEnemies.forEach(aenemy => {
        var aindex = __screenEnemies.indexOf(aenemy);
        __screenEnemies.forEach(enemy => {
            var index = __screenEnemies.indexOf(enemy);
            var hit = collideRectRect(enemy.x + 10, enemy.y + 10, enemy.w - 20, enemy.h - 20, aenemy.x, aenemy.y, aenemy.w, aenemy.h);
            if ((aenemy.type != 5 && enemy.type != 5) && (aenemy.type != 6 && enemy.type != 6)) {
                if (hit && (aindex != index)) {
                    if (enemy.type > aenemy.type) {
                        removeEnemy(aenemy, true);
                    }
                    else if (aenemy.type > enemy.type) {
                        removeEnemy(enemy, true);
                    }
                    else {
                        removeEnemy(aenemy, true);
                        removeEnemy(enemy, true);
                    }
                }
            }
        });
    });
}