var environment = require('./environment')
var SpectrumAnalyser = require('./spectrum-analyser')
var view = require('./view')(environment)
var analyser = new SpectrumAnalyser()
var $ = require('jquery')

$('#open-url-form-btn').click(view.openForm)
$('#close-url-form-btn').click(view.closeForm)
$('#url-form').submit(function (e) {
  e.preventDefault()
  analyser.start($('#url-field').val())
          .then(view.closeForm)
          .fail(view.displayUrlError)
})

environment.init(analyser)
environment.startAnimation()
environment.addRingsToScene(200)
