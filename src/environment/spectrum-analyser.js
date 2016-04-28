var clientId = process.env.CLIENT_ID
import SoundcloudAudioInterface from 'soundcloud-audio-interface'
import webAudioAnalyser2 from 'web-audio-analyser-2'

class SpectrumAnalyser {

  constructor () {
    this.audioCtx = new AudioContext()
    this.gainNode = this.audioCtx.createGain()
    this.output = this.audioCtx.destination
    this.analyser = webAudioAnalyser2({ context: this.audioCtx, fftSize: 2048 })
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

  mute () {
    this.gainNode.gain.value = 0
  }

  isRunning () {
    return this.scAudioInterface.audio && !this.scAudioInterface.audio.paused
  }

  getFrequencyData () {
    return this.analyser.barkScaleFrequencyData().frequencies
  }

}

export default SpectrumAnalyser
