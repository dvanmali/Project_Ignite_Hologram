import P5 from 'p5'

const hslToRgb = (h, s, l) => {
    let r, g, b;

    if(s === 0){
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export default ({
    canvasRoot,
    analyzer,
}) => {
    let lastAmplitude = 0
    let lastBeatAmplitude = 0
    let lastAverageBestPitch = 0
    analyzer.on('averageAverageAmplitude', (amplitude) => {
      lastAmplitude = amplitude
    })
    analyzer.on('averageAmplitude', (amplitude) => {
      lastBeatAmplitude = amplitude
    })
    analyzer.on('averageBestPitch', (pitch) => {
      lastAverageBestPitch = pitch
    })
    const p5 = new P5((sketch) => {
        let amplitude, cnv;
        
        sketch.setup = () => {
          cnv = sketch.createCanvas(800,800, sketch.WEBGL);
        }

        sketch.draw = () => {
          sketch.background(0);
          const level = Math.min(Math.max(0.1, Math.log10(100 * lastAmplitude) / 2) + lastBeatAmplitude * 0.2, 1)
          const size = sketch.map(level, 0, 1, 0, 300);
          sketch.stroke(0,0,0);
          sketch.fill(...hslToRgb(sketch.map(lastAverageBestPitch, 0, 255, 0, 1), 0.9, 0.5));
          sketch.background(0);
          sketch.rotateX(sketch.frameCount * 0.005);
          sketch.rotateZ(sketch.frameCount * 0.005);
          sketch.sphere(size,24,16);
        }
    }, canvasRoot)
}
