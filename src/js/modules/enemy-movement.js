var __enemy_perkin;
var __enemy_choro;
var __screenEnemies = [];
var __spawnPositions = [155, 257, 367, 472];
var __maxPerkin = 3;
var __maxChoro = 2;


function loadEnemies() {
    __enemy_perkin = new Enemy();
    __enemy_perkin.loadEnemy("assets/EAN.png", "assets/EAL.png", "assets/EAR.png");
    __enemy_perkin.type = 1;

    
    __enemy_choro = new Enemy();
    __enemy_choro.loadEnemy("assets/EBN.png", "assets/EBL.png", "assets/EBR.png");
    __enemy_choro.type = 2;
}


var lastGeneration = 0;
function processEnemies() {
    var secs = (millis() / 1000).toFixed(0);
    if ((secs % 1) == 0 && lastGeneration != secs) {
        lastGeneration = secs;
        var prob = getRandomProbability();
        //probabilidad que aparezca un perkin 70%
        if (prob < 70) {
            var e = Object.assign(Object.create(Object.getPrototypeOf(__enemy_perkin)), __enemy_perkin)
            e.x = getRandomPositionX();
            e.y = -150;
            if (getCountEnemies(1) < __maxPerkin && notCollide(e)) {
                console.log("Generando perkin");
                __screenEnemies.push(e);
            }
        }

        //probabilidad que aparezca un choro 50%
        if (prob < 65) {
            var e = Object.assign(Object.create(Object.getPrototypeOf(__enemy_choro)), __enemy_choro)
            e.x = getRandomPositionX();
            e.y = -150;
            if (getCountEnemies(1) < __maxChoro && notCollide(e)) {
                console.log("Generando choro");
                __screenEnemies.push(e);
            }
        }
    }

    __screenEnemies.forEach(enemy => {
        if (enemy.type == 1) perkinMovement(enemy);
        if (enemy.type == 2) choroMovement(enemy);
        if (enemy.type == 3) perkinMovement(enemy);
        if (enemy.type == 4) perkinMovement(enemy);
    });
}

function calculeCollitions() {
    __screenEnemies.forEach(enemy => {
        var hit = collideRectRect(enemy.x + 20, enemy.y + 20, enemy.w - 40, enemy.h - 40, __prota.x, __prota.y, __prota.w, __prota.h);
        if (hit) {
            changeScene(3);
            return;
        }
    });
}

function showEnemies() {
    calculeCollitions();
    processEnemies();
    collideEnemies();
    __screenEnemies.forEach(enemy => {
        enemy.showEnemy(enemy.preangle);
    });
}

function perkinMovement(enemy) {
    var amount = 6;
    enemy.y = enemy.y + amount;

    if (enemy.y > height) removeEnemy(enemy);
}

function choroMovement(enemy) {
    var amount = 7;
    enemy.preangle = 0;
    enemy.y = enemy.y + amount;
    if (__prota.x < enemy.x) {
        enemy.x -= 1;
        enemy.preangle = 1;
    }
    if (__prota.x > enemy.x) {
        enemy.x += 1;
        enemy.preangle = -1;
    }
    if (enemy.y > height) removeEnemy(enemy);
}

function getRandomPositionX() {
    var index = Math.floor(Math.random() * 4);
    return __spawnPositions[index];
}

function getRandomProbability() {
    var index = Math.floor(Math.random() * 101);
    return index;
}


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

function removeEnemy(enemy) {
    var index = __screenEnemies.indexOf(enemy);
    if (index !== -1) {
        __screenEnemies.splice(index, 1);
    }
}

function notCollide(aenemy) {
    var collide = false;
    __screenEnemies.forEach(enemy => {
        var hit = collideRectRect(enemy.x, enemy.y, enemy.w, enemy.h, aenemy.x, aenemy.y, aenemy.w, aenemy.h);
        if (hit) collide = true;
    });
    return !collide;
}

function collideEnemies() {
    __screenEnemies.forEach(aenemy => {
        var aindex = __screenEnemies.indexOf(aenemy);
        __screenEnemies.forEach(enemy => {
            var index = __screenEnemies.indexOf(enemy);
            var hit = collideRectRect(enemy.x, enemy.y, enemy.w, enemy.h, aenemy.x, aenemy.y, aenemy.w, aenemy.h);
            
            if (hit && (aindex != index)) {
                console.log("enemy hit!! " + aindex + " - " + index);
                if (enemy.type > aenemy.type){
                    removeEnemy(aenemy);
                }
                else if (aenemy.type > enemy.type){
                    removeEnemy(enemy);
                }
                else {
                    removeEnemy(aenemy);
                    removeEnemy(enemy);
                }
            }
        });
    });
}