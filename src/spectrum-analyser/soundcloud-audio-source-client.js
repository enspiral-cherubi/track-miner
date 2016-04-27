import http from 'request-promise-json'

class SoundcloudAudioSourceClient {

  constructor (opts) {
    this.clientId = opts.clientId
    this.audioCtx = opts.audioCtx
    this.source = null
    this.audio = null
  }

  setUrl (url) {
    var resolveUrl = 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + this.clientId
    return http.get(resolveUrl).then((res) => {
      var streamUrl = res.stream_url + '?client_id=' + this.clientId
      if (this.audio) { this.audio.pause() }
      this.audio = new Audio(streamUrl)
      this.audio.crossOrigin = 'anonymous'
      this.source = this.audioCtx.createMediaElementSource(this.audio)
    })
  }

}

export default SoundcloudAudioSourceClient
