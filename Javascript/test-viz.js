function MyCircle(color,index) {
  this.pos   = [ Math.random() * width,
                 Math.random() * height ];
  this.color = color;
  this.index = index;
}

function preload(){
  sound = loadSound('Audio/Italy_Jr.mp3');
}

function setup(){
  // create canvas
  var cnv = createCanvas(1024,768);
  cnv.mouseClicked(togglePlay);

  // FFT's (low definition and high definition)
  var ld = 16;
  var hd = 1024;
  fft_ld = new p5.FFT(0.8,ld);
  fft_hd = new p5.FFT(0.8,hd);

  // random circle posisions and colors
  circs = [];
  for(var i = 0; i < ld; i++)
    circs.push(new MyCircle( i / ld , i ));

  // set amplitude
  sound.amp(0.2);
}

function draw(){
  background(255,255,255);
  //if(sound.isPlaying()) console.log("hello");

  // draw pulsing circles
  var spec = fft_ld.analyze();
  noStroke();
  for (c of circs) {
    var p = c.pos;
    fill(0,0,128); // spectrum is green
    //console.log(c.pos[0]+" "+c.pos[1]);
    circle(p[0],p[1],spec[c.index])
  }

  // draw wave form
  var waveform = fft_hd.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

  text('click to play/pause', 4, 10);
}

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
