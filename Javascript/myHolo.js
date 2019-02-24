var sound, amplitude, cnv;
var fft, peakDetect;
var ellipseWidth = 0;

function preload(){
  sound = loadSound('Audio/Italy_Jr.mp3');
}

function setup(){
  cnv = createCanvas(700,700);
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
    
  var spectrum = fft.analyze();
  noStroke();
  fill(0,0,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }

  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(0,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
    
  var level = amplitude.getLevel();
  var size = map(level, 0, 1, 0, 1000);
  stroke(0,0,255);
  ellipse(width/2, height/2, size*(Math.random()+2), size*(Math.random()+2));

  fft.analyze();
  peakDetect.update(fft);
    
  stroke(0,255,255);
  ellipseWidth *= 0.95;
  ellipse(width/2, height/2, ellipseWidth*2, ellipseWidth*2);
    
  
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
  ellipseWidth = 50;
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
  




