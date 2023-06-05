class Scene {

    constructor(name) {
      this.name = name;
    }
  
    setup(ctx, canvas) {
        console.log('Scene ' + this.name + ' loaded.');
    }

    draw(ctx, canvas) {
        //nothing...
    }

    clearCanvas(ctx, canvas){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }