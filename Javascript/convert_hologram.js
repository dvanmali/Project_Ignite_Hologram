var MCBuffer;

var drawing_top_bot;
var drawing_lef_rig;

var centerSquareWidth = 250;
var centerSquareHeight = 250;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

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
}

function draw() {
	// Clear background to black
	background(0, 0, 0);

	/*********************************************************
	 * Draw on your buffers however you like				 *
	 * Rotate each zone so they are drawn correctly			 *
	 *********************************************************/
	// Original Image to draw
	drawing_top_bot = createImage(centerSquareWidth,
		(window.innerHeight - centerSquareHeight) / 2);
	drawing_lef_rig = createImage(centerSquareHeight,
		(window.innerWidth - centerSquareWidth) / 2);

	// Do stuff to drawing to make an animation
	drawImage(drawing_top_bot);
	drawImage(drawing_lef_rig);

	// Middle-top
	push();
	image(drawing_top_bot, (window.innerWidth - centerSquareWidth) / 2, 0);
	pop();

	// Left-Center
	push();
	imageMode(CENTER);
	rotate(radians(-90));
	image(drawing_lef_rig, -window.innerHeight / 2,
		((window.innerWidth - centerSquareWidth) / 2) / 2);
	pop();

	// Middle-Center
	push();
	drawMCBuffer();
	image(MCBuffer, (window.innerWidth - centerSquareWidth) / 2,
		(window.innerHeight - centerSquareHeight) / 2);
	//	drawing_center  = createImage(centerSquareWidth, centerSquareHeight);
	//	drawImage(drawing_center);
	//	image(drawing_center, window.innerWidth /2 - centerSquareWidth/2,
	//		  				  window.innerHeight/2 - centerSquareHeight/2);
	pop();

	// Right-Center
	push();
	imageMode(CENTER);
	rotate(radians(90));
	image(drawing_lef_rig, window.innerHeight / 2,
		-window.innerWidth + ((window.innerWidth - centerSquareWidth) / 2) / 2);
	pop();

	// Middle-Bottom
	push();
	imageMode(CENTER);
	rotate(radians(180));
	image(drawing_top_bot, -window.innerWidth / 2,
		-window.innerHeight + ((window.innerHeight - centerSquareHeight) / 2) / 2);
	pop();
}

// Draw Images inside the canvas
function drawImage(img) {
	// Option 1: Draw Individual Pixels
	img.loadPixels();
	for (let x = 0; x < img.width; x++) {
		for (let y = 0; y < img.height; y++) {
			let a = map(y, 0, img.height, 0, 255);
			img.set(x, y, [0, 153, 204, a]);
		}
	}
	img.updatePixels();
	
	// Option 2: Load Image
	/*
	drawing_top_bot = loadImage('mario.png');
	drawing_lef_rig = loadImage('mario.png');
	*/
}

// Middle-Center Buffer
function drawMCBuffer() {
	MCBuffer.background(255, 255, 255);
	MCBuffer.fill(0, 0, 0);
	MCBuffer.textSize(32);
}
