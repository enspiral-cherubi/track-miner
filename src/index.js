var environment = require('./environment')
var SpectrumAnalyser = require('./spectrum-analyser')
var $ = require('jquery')
var analyser = new SpectrumAnalyser()

$('#open-url-form-btn').click(openForm)
$('#close-url-form-btn').click(closeForm)

$('#url-form').submit(function (e) {
  e.preventDefault()
  var url = $('#url-field').val()
  analyser.start(url).then(closeForm)
})

environment.init(analyser)
environment.startAnimation()
environment.addRingsToScene(200)

function openForm () {
  $('#url-form-container').show()
  $('#open-url-form-btn').hide()
  environment.stopControls()
}

function closeForm () {
  $('#url-form-container').hide()
  $('#open-url-form-btn').show()
  environment.startControls()
}
