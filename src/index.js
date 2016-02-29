var environment = require('./environment')
var SpectrumAnalyser = require('./spectrum-analyser')
var $ = require('jquery')

$('#open-url-form-btn').click(function () {
  $('#url-form-container').show()
  $(this).hide()
})

$('#close-url-form-btn').click(function () {
  $('#url-form-container').hide()
  $('#open-url-form-btn').show()
})

var analyser = new SpectrumAnalyser()
// analyser.start(url)

environment.init(analyser)
environment.startAnimation()
environment.addRingsToScene(200)
analyser.mute()
