import $ from 'jquery'
var clientId = process.env.CLIENT_ID
import range from 'lodash.range'
import splitArray from './split-array.js'
import avg from './avg.js'
import flatten from 'lodash.flatten'
import SoundcloudAudioSourceClient from './soundcloud-audio-source-client.js'

class SpectrumAnalyser {

  constructor () {
    this.numOfFrequencyBands = 1024
    this.audioCtx = new AudioContext()
    this.gainNode = this.audioCtx.createGain()
    this.frequencyData = new Uint8Array(this.numOfFrequencyBands)
    this.output = this.audioCtx.destination
    this.scAudioSourceClient = new SoundcloudAudioSourceClient({
      audioCtx: this.audioCtx,
      clientId: clientId
    })
  }

  start (url) {
    this.scAudioSourceClient.setUrl(url).then(() => {
      this.output = this.audioCtx.destination;
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = this.numOfFrequencyBands * 2;
      this.scAudioSourceClient.source.connect(this.analyser);
      this.analyser.connect(this.gainNode);
      this.gainNode.connect(this.output);
      this.scAudioSourceClient.audio.play()
    })
  }

  mute () {
    this.gainNode.gain.value = 0
  }

  isRunning () {
    return this.analyser && !this.scAudioSourceClient.audio.paused
  }

  getFrequencyData () {
    this.analyser.getByteFrequencyData(this.frequencyData)

    var logSubsectionSlicePoints = [
      {x0:   0, x1:    7},
      {x0:   7, x1:   18},
      {x0:  18, x1:   48},
      {x0:  48, x1:  125},
      {x0: 125, x1:  331},
      {x0: 331, x1:  871},
      {x0: 871, x1: 1023}
    ]

    var logSubsections = logSubsectionSlicePoints.map((point) => {
      return this.frequencyData.slice(point.x0, point.x1)
    })

    var averages = flatten(logSubsections.map((subsection) => {
      var stepSize = Math.floor(subsection.length / 7)
      return splitArray(subsection, stepSize).map(avg)
    }))

    return averages.slice(0, -6)
  }

}

export default SpectrumAnalyser
