import mitt from 'mitt'

const averageArray = (arr) => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum / arr.length
}

export default ({ 
  mediaStream,
}) => {
    const context = new AudioContext()
    const source = context.createMediaStreamSource(mediaStream)

    const analyser = context.createAnalyser()
    analyser.fftSize = 2048
    analyser.minDecibels = -60
    analyser.smoothingTimeConstant = 0.3
    source.connect(analyser)
    const fftArray = new Uint8Array(analyser.frequencyBinCount)

    const emitter = mitt()

    let lastAmplitude = null

    const previousBestPitches = []
    const previousAmplitudes = []
    const emitEvents = () => {
      analyser.getByteFrequencyData(fftArray)
      const pitches = []
      let bestPitch = null
      let bestPitchAmplitude = null
      for (let i = 0; i < fftArray.length; i++) {
        const pitchAmplitude = fftArray[i] / 256
        pitches.push(pitchAmplitude)
        if (pitchAmplitude > 0.2 && pitchAmplitude > bestPitchAmplitude) {
          bestPitch = i
          bestPitchAmplitude = pitchAmplitude
        }
      }
      previousBestPitches.push(bestPitch)
      while(previousBestPitches.length > 10) {
        previousBestPitches.shift()
      }
      // console.log(previousBestPitches)
      emitter.emit('averageBestPitch', averageArray(previousBestPitches))
//      if (bestPitch !== null && previousBestPitches.filter((pitch) => pitch === bestPitch).length >= 3) {
//        emitter.emit('bestPitchAmplitude', bestPitchAmplitude)
//      }
//      emitter.emit('pitch', pitches)
      const latestAverageAmplitude = averageArray(pitches) * 15
      previousAmplitudes.push(latestAverageAmplitude)
      while (previousAmplitudes.length > 20) {
        previousAmplitudes.shift()
      }
      emitter.emit('averageAverageAmplitude', averageArray(previousAmplitudes))
      emitter.emit('averageAmplitude', latestAverageAmplitude)
//      if (lastAmplitude !== null) {
//        emitter.emit('amplitude', lastAmplitude)
//      }
      requestAnimationFrame(emitEvents)
    }
    requestAnimationFrame(emitEvents)

    return emitter
}
