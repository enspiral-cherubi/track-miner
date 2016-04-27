var $ = require('jquery')
var clientId = process.env.CLIENT_ID
var range = require('lodash.range')
var splitArray = require('./split-array')
var avg = require('./avg')
var flatten = require('lodash.flatten')

function SpectrumAnalyser () {
  this.numOfFrequencyBands = 1024;
  this.context = new AudioContext();
  this.gainNode = this.context.createGain()
  this.frequencyData = new Uint8Array(this.numOfFrequencyBands);
  this.output = this.context.destination;
}

SpectrumAnalyser.prototype.start = function (url) {
  var self = this
  var streamUrl = 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + clientId
  return $.get(streamUrl, function (res) {
    var streamUrl = res.stream_url + '?client_id=' + clientId
    self.setupAudio(streamUrl)
  })
}

SpectrumAnalyser.prototype.setupAudio = function (streamUrl) {
  if (this.audio) { this.audio.pause() }
  this.audio = new Audio(streamUrl)
  this.audio.crossOrigin = 'anonymous';
  this.source = this.context.createMediaElementSource(this.audio);
  this.output = this.context.destination;
  this.analyser = this.context.createAnalyser();
  this.analyser.fftSize = this.numOfFrequencyBands * 2;
  this.source.connect(this.analyser);
  this.analyser.connect(this.gainNode);
  this.gainNode.connect(this.output);
  this.audio.play()
}

SpectrumAnalyser.prototype.mute = function () {
  this.gainNode.gain.value = 0
}

SpectrumAnalyser.prototype.isRunning = function () {
  return this.analyser && !this.audio.paused
}

SpectrumAnalyser.prototype.getFrequencyData = function () {
  var self = this

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

  var logSubsections = logSubsectionSlicePoints.map(function (point) {
    return self.frequencyData.slice(point.x0, point.x1)
  })

  var averages = flatten(logSubsections.map(function (subsection) {
    var stepSize = Math.floor(subsection.length / 7)
    return splitArray(subsection, stepSize).map(avg)
  }))

  return averages.slice(0, -6)
}

module.exports = SpectrumAnalyser
