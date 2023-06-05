class KeyInput{
    keysPressed = new Object();

    constructor(){
        this.keysPressed = new Object();
    }

    Listen(){
        var listener = this;
        if (listener.keysPressed == undefined) listener.keysPressed = new Object();
        window.onkeydown = function(event) {
            event.preventDefault();
            var keys = Object.keys(listener.keysPressed);
            if (!keys.includes(event.code)){
                listener.keysPressed[event.code] = new Object();
            }
            listener.keysPressed[event.code].pressed = true;
            listener.keysPressed[event.code].timestamp = Date.now();
            listener.PrintKeyPressed();
        };    

        window.onkeyup = function(event) {
            event.preventDefault();
            var keys = Object.keys(listener.keysPressed);
            if (!keys.includes(event.code)){
                listener.keysPressed[event.code] = new Object();
            }
            listener.keysPressed[event.code].pressed = false;
            listener.PrintKeyPressed();
        };
    };

    PrintKeyPressed(){
        var tempPress = [];
        var keys = Object.keys(this.keysPressed);
        keys.forEach(element => {
            if (this.keysPressed[element].pressed) {
                tempPress.push(element);
            }
        });
        var pressed = tempPress.join(' + ' );
        document.getElementById('key').innerHTML = pressed;
    }

    IsKeyPressed(key){
        var keys = Object.keys(this.keysPressed);
        if (!keys.includes(key)){
            this.keysPressed[key] = new Object();
            this.keysPressed[key].pressed = false
        }
        var pressed = this.keysPressed[key].pressed;
        if (pressed == undefined) pressed = false;
        return pressed;
    }

    OnKeyPressed(callback, key){
        if (this.IsKeyPressed(key)){
            callback();
        }
    }

    OnKeyPressed(callback, ...keys){
        var pressed = false;
        keys.forEach(element => {
            if (this.IsKeyPressed(element)) pressed = true;
        });
        if (pressed){
            callback();
        }
    }
}