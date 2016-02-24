var $ = require('jquery')
var clientID = process.env.CLIENT_ID

function SpectrumAnalyser () {
  this.numOfFrequencyBands = 512;
  this.context = new AudioContext();
  this.frequencyData = new Uint8Array(this.numOfFrequencyBands);
  this.output = this.context.destination;
}

SpectrumAnalyser.prototype.start = function (url) {
  var self = this
  var streamUrl = 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + clientID
  $.get(streamUrl, function (res) {
    var streamUrl = res.stream_url + '?client_id=' + clientID
    self.setupAudio(streamUrl)
  })
}

SpectrumAnalyser.prototype.setupAudio = function (streamUrl) {
  this.audio = new Audio(streamUrl)
  this.audio.crossOrigin = 'anonymous';
  this.source = this.context.createMediaElementSource(this.audio);
  this.output = this.context.destination;
  this.analyser = this.context.createAnalyser();
  this.analyser.fftSize = this.numOfFrequencyBands * 2;
  this.source.connect(this.analyser);
  this.analyser.connect(this.output);
  this.audio.play()
}

module.exports = SpectrumAnalyser
