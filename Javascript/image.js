function setup() {
    createCanvas(600,600, WEBGL);
}
function draw() {
    background(500); {
        rotateX(frameCount * 0.005);
        rotateZ(frameCount * 0.005);
        sphere(200,24,16);
        let c = color (255,204,0);
        fill(255,0,0,150);
        
        if (mouseIsPressed) { 
            rotateX(frameCount * 0.003);
            rotateZ(frameCount * 0.003);
            sphere(255,24,16);
            let c = color (255,204,0);
            fill(255,0,0,150);
        } else {           
            rotateX(frameCount * 0.003);
            rotateZ(frameCount * 0.003);
            sphere(200,24,16);
            let c = color (255,204,0);
            fill(255,0,0,150);
    
        }
        }
}











