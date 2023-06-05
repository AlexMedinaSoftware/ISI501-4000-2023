class CarMinigame extends Scene{
    playerX = 0;
    playerY = 0;
    bg = new Image();
    bgLoaded = false;
    car = new Image();
    carLoaded = false;
    
    constructor(name){
        super(name);
    }

    setup(ctx, canvas){
        this.playerX = 165;
        this.playerY = canvas.height-30;
        this.bg = new Image(); 
        this.bg.src = './assets/demo_bg.png'; 
        this.bg.onload = () => {   
            this.bgLoaded = true;
        };
        this.car = new Image(); 
        this.car.src = './assets/car.png'; 
        this.car.onload = () => {   
            this.carLoaded = true;
        };

        super.setup(ctx, canvas);
    }
    
    draw(ctx, canvas, scene){
        scene.clearCanvas(ctx, canvas);
        scene.drawBackground(ctx);
        scene.drawPlayer(ctx, scene.playerX, scene.playerY);
        scene.detectKeyboard();
        scene.playerLimits(canvas);

        super.draw(ctx, canvas, scene);
    }
    
    drawPlayer(ctx, x, y) {
        if (this.carLoaded){  
            ctx.drawImage(this.car,0,0,this.car.width,this.car.height,x,y,55,100);
        }
    }
    
    playerLimits(canvas) {
        var minX = 90;
        var maxX = canvas.width - 145;
        var minY = 20;
        var maxY = canvas.height - 105;
    
        if (this.playerX < minX) this.playerX = minX;
        if (this.playerX > maxX) this.playerX = maxX;
        if (this.playerY < minY) this.playerY = minY;
        if (this.playerY > maxY) this.playerY = maxY;
    
    }
    
    drawBackground(ctx){
        if (this.bgLoaded){  
            ctx.drawImage(this.bg, 0, 0);
        }
    }
    
    detectKeyboard() {
        var velocityDef = 3;
    
        var velocity = velocityDef;
    
        keyInput.OnKeyPressed(() => {
            velocity = velocityDef + 3;
        }, 'ShiftLeft');
    
        keyInput.OnKeyPressed(() => {
            this.playerY -= velocity;
        }, 'KeyW', 'ArrowUp');
    
        keyInput.OnKeyPressed(() => {
            this.playerY += velocity;
        }, 'KeyS', 'ArrowDown');
    
        keyInput.OnKeyPressed(() => {
            this.playerX -= velocity;
        }, 'KeyA', 'ArrowLeft');
    
        keyInput.OnKeyPressed(() => {
            this.playerX += velocity;
        }, 'KeyD', 'ArrowRight');
    
    }
}