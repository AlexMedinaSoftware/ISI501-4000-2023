let __video;
let __videoB;
let __videoEnded = false;


function loadVideoScene(){
    __video = createVideo(["assets/intro.mp4"]);
    __video.elt.hidden = true;
    __video.elt.addEventListener('ended', videoEndedCallback);
}

function videoEndedCallback() {
    __videoEnded = true;
}

function setupVideoScene(){    
    __videoEnded = false;
    __video.play();
}