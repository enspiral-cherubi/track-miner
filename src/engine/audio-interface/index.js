var clientId = process.env.CLIENT_ID
import SoundcloudAudioInterface from 'soundcloud-audio-interface'
import webAudioAnalyser2 from 'web-audio-analyser-2'

class AudioInterface {

  constructor () {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    this.gainNode = this.audioCtx.createGain()
    this.output = this.audioCtx.destination
    this.analyser = webAudioAnalyser2({ context: this.audioCtx, fftSize: 2048, addSubBassToBarkScale: true })
    this.scAudioInterface = new SoundcloudAudioInterface({ audioCtx: this.audioCtx, clientId: clientId })
    this.analyser.connect(this.gainNode)
    this.gainNode.connect(this.output)
  }

  start (url) {
    return this.scAudioInterface.setUrl(url).then(() => {
      this.output = this.audioCtx.destination;
      this.scAudioInterface.source.connect(this.analyser)
      this.scAudioInterface.audio.play()
    })
  }

  isRunning () {
    return this.scAudioInterface.audio && !this.scAudioInterface.audio.paused
  }

  getFrequencyData () {
    return this.analyser.barkScaleFrequencyData().frequencies
  }

}

export default AudioInterface
