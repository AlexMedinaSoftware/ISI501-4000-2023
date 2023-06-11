let __startDevInfo;

function showDevInfo(){
    if (__startDevInfo == undefined) __startDevInfo = 0;
    let fps = frameRate();
    fill(0);
    stroke(0);
    text("FPS: " + fps.toFixed(0), 10, height - 130);
    let end = millis();
    let elapsed = end - __startDevInfo;    
    text("This took: " + elapsed.toFixed(2) + "ms.", 10, height - 115);
    __startDevInfo = millis();
  }