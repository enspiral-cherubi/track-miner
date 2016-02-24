var $ = require('jquery')
var clientID = process.env.CLIENT_ID

function SpectrumAnalyser () {
  this.numOfFrequencyBands = 512;
  this.context = new AudioContext();
  this.frequencyData = new Uint8Array(this.numOfFrequencyBands);
  this.output = this.context.destination;
}

SpectrumAnalyser.prototype.setupWith = function (url) {
  var self = this
  var streamUrl = 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + clientID
  $.get(streamUrl, function (res) {
    var streamUrl = res.stream_url + '?client_id=' + clientID
    self.audio = new Audio(streamUrl)
    self.audio.crossOrigin = 'anonymous';
    self.source = self.context.createMediaElementSource(self.audio);
    self.output = self.context.destination;
    self.analyser = self.context.createAnalyser();
    self.analyser.fftSize = self.numOfFrequencyBands * 2;
    self.source.connect(self.analyser);
    self.analyser.connect(self.output);
    self.audio.play()
  })
}

module.exports = SpectrumAnalyser
