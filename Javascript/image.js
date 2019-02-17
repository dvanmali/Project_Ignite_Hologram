function preload() {
    mySound = loadSound('Audio/Italy_Jr.mp3');
}

function setup() {
    createCanvas(400,400);
    mySound.setVolume(1.0);
    mySound.play();
}

function mousedPressed() {
    if (song.isPlaying()) {
        song.stop();
    }
    else {
        song.play();
    }
}

function draw() {
    noStroke();
    
    if (mouseIsPressed) {
        c = color('rgb(255,0,0)');
        fill(c);
    }
    else {
        c = color('rgb(0,255,100)');
        fill(c);
    }
    
    ellipse(mouseX, mouseY, 80, 80);
}