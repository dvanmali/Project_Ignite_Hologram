var MCBuffer, OffscreenBuffer;

var drawing_top_bot;
var drawing_lef_rig;

var centerSquareWidth = 250;
var centerSquareHeight = 250;


//ADD YOUR CUSTOM VARIABLES HERE, KIDS!

var sound, amplitude, cnv;
var fft, peakDetect;
var peakSize;
var peakColor;
var width = 800;
var height = 800;




function preload(){
  sound = loadSound('Audio/Italy_Jr.mp3');
}


function setup() {
	cnv = createCanvas(window.innerWidth, window.innerHeight);

	/*********************************************************
	 * Create dynamic size with respect to the center		 *
	 *********************************************************/

	/*********************************************************
	 * Create size allocation for each zone					 *
	 *********************************************************/
	/*
	// Middle-Top
	MTBuffer = createGraphics(centerSquareWidth,
							  (window.innerHeight-centerSquareHeight) / 2);
	/*
	// Middle-Top
	MTBuffer = createGraphics(centerSquareWidth,
							  (window.innerHeight-centerSquareHeight) / 2);
	
	// Left-Center
	LCBuffer = createGraphics((window.innerWidth-centerSquareWidth) / 2,
							  centerSquareHeight);
	// Left-Center
	LCBuffer = createGraphics((window.innerWidth-centerSquareWidth) / 2,
							  centerSquareHeight);
	*/

	// Middle-Center
	MCBuffer = createGraphics(centerSquareWidth, centerSquareHeight);
	OffscreenBuffer = createGraphics(centerSquareWidth, centerSquareHeight, WEBGL);

	/*
	// Right-Center
	RCBuffer = createGraphics((window.innerWidth-centerSquareWidth) / 2,
							  centerSquareHeight);

	// Middle-Bottom
	MBBuffer = createGraphics(centerSquareWidth,
							  (window.innerHeight-centerSquareHeight) / 2);
	*/

	/*
	LTBuffer = createGraphics(TBD, TBD);
	RTBuffer = createGraphics(TBD, TBD);
	LBBuffer = createGraphics(TBD, TBD);
	RBBuffer = createGraphics(TBD, TBD);
	 */



  //ADD ANY SETUP PROCEEDURES HERE!

  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(0.2);
  amplitude = new p5.Amplitude();
  textAlign(CENTER);

  fft = new p5.FFT();
  peakDetect = new p5.PeakDetect();

  setupSound();

  peakDetect.onPeak(triggerBeat);
  text('click to play', width/2, height/2);


}

function draw() {
	// Clear background to black
	background(0, 0, 0);

	drawOffscreenBuffer();

	// Middle-top
	push();
	image(OffscreenBuffer, (window.innerWidth - centerSquareWidth) / 2, 0);
	pop();

	// Left-Center
	push();
	image(OffscreenBuffer, (window.innerWidth - centerSquareWidth) / 2 - centerSquareHeight, (window.innerHeight - centerSquareHeight) / 2);
	imageMode(CENTER);
	rotate(radians(-90));
	pop();

	// Middle-Center
	push();
	drawMCBuffer();
	image(MCBuffer, (window.innerWidth - centerSquareWidth) / 2, (window.innerHeight - centerSquareHeight) / 2);
	//	drawing_center  = createImage(centerSquareWidth, centerSquareHeight);
	//	drawImage(drawing_center);
	//	image(drawing_center, window.innerWidth /2 - centerSquareWidth/2,
	//		  				  window.innerHeight/2 - centerSquareHeight/2);
	pop();

	// Right-Center
	push();
	image(OffscreenBuffer, (window.innerWidth - centerSquareWidth) / 2 + centerSquareHeight, (window.innerHeight - centerSquareHeight) / 2);
	imageMode(CENTER);
	rotate(radians(90));
	pop();

	// Middle-Bottom
	push();
	imageMode(CENTER);
	rotate(radians(180));
	image(OffscreenBuffer, -window.innerWidth / 2, -window.innerHeight + ((window.innerHeight - centerSquareHeight) / 2) / 2);
	pop();
}



//DRAW YOUR STUFF HERE!

function drawOffscreenBuffer() {

  OffscreenBuffer.background(0); 

	
  var level = amplitude.getLevel();
  var size = map(level, 0, 1, 0, 800);
  OffscreenBuffer.stroke(0,0,0);
  OffscreenBuffer.fill(0,255,100);
  OffscreenBuffer.background(0); {
        OffscreenBuffer.rotateX(frameCount * 0.0005);
        OffscreenBuffer.rotateZ(frameCount * 0.0005);
        OffscreenBuffer.sphere(size,24,16);
        OffscreenBuffer.fill(255,0,0,150);
   }
    
  fft.analyze();
  peakDetect.update(fft);
  OffscreenBuffer.fill(0,0,peakColor);
  OffscreenBuffer.stroke(0,0,peakColor);
  peakColor = peakColor*.970;
  peakSize = peakSize*1.03;
  OffscreenBuffer.ellipse(width/2000, height/2000, peakSize, peakSize);
  if (peakSize < 900) {
      peakSize = peakSize;
  } else {
      peakSize = 0;
  }

}


//HELPER FUNCTIONS? NO PROBLEM!

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



// Middle-Center Buffer
function drawMCBuffer() {
	MCBuffer.background(255, 255, 255);
	MCBuffer.fill(0, 0, 0);
	MCBuffer.textSize(32);
}
