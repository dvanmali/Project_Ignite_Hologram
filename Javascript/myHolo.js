var sound, amplitude, cnv;
var fft, peakDetect;
var peakSize;
var peakColor;
var width = 800;
var height = 800;


function preload(){
  sound = loadSound('Audio/Italy_Jr.mp3');
}

function setup(){
  cnv = createCanvas(800,800, WEBGL);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(0.2);
  amplitude = new p5.Amplitude();
  textAlign(CENTER);

  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect();

  setupSound();

  // when a beat is detected, call triggerBeat()
  peakDetect.onPeak(triggerBeat);
  text('click to play', width/2, height/2);
}


function draw(){
  background(0); 
  var level = amplitude.getLevel();
  var size = map(level, 0, 1, 0, 800);
  stroke(0,0,0);
  fill(0,255,0);
   background(0); {
        rotateX(frameCount * 0.005);
        rotateZ(frameCount * 0.005);
        sphere(size,24,16);
        fill(255,0,0,150);
   }
    
  fft.analyze();
  peakDetect.update(fft);
  fill(0,0,peakColor);
  stroke(0,0,peakColor);
  peakColor = peakColor*.975;
  peakSize = peakSize*1.03;
  ellipse(width/1000, height/1000, peakSize, peakSize);
  if (peakSize < 900) {
      peakSize = peakSize;
  } else {
      peakSize = 0;
  }
 
  
}


// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}



// this function is called by peakDetect.onPeak
function triggerBeat() {
  peakSize = 100;
  peakColor = 255;
  console.log ("Check");
  console.log (peakSize);

}

// mouseclick starts/stops sound
function setupSound() {
  cnv.mouseClicked( function() {
    if (sound.isPlaying() ) {
      sound.stop();
    } else {
      sound.play();
    }
  });
}
  




