const frequencyFromNoteNumber = (note) => {
  return 440 * Math.pow(2, (note - 69) / 12)
}

export default ({
  canvas,
  analyzer,
}) => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.strokeStyle = 'rgb(0, 0, 0)'
  let i = 0
  let sum = 0
  analyzer.on('amplitude', (amplitude) => {
    sum += amplitude
    if (++i % 2 === 0) {
      const avgAmplitude = sum / 2
      sum = 0
      ctx.clearRect(0, 0, 500, 500)
      ctx.fillRect(100, 100, 100 + (5000 * avgAmplitude), 100 + (5000 * avgAmplitude))
    }
  })
  analyzer.on('pitch', (pitches) => {
    ctx.clearRect(500, 0, 2000, 2000)
    for (let i = 0; i < pitches.length; i += 2) {
      const pitch = pitches[i]
      if (pitch < 0.2) {
        pitch = 0
      }
      ctx.fillRect(500 + i * 10, 300 - pitch * 80, 10, pitch * 80)
    }
  })
  analyzer.on('bestPitch', (bestPitch) => {
    document.getElementById('x').textContent = (22 * bestPitch) + ' Hz'
  })
}
