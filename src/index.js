import Environment from './environment/index.js'
var clientId = process.env.CLIENT_ID
import SpectrumAnalyser from './spectrum-analyser/index.js'
var analyser = new SpectrumAnalyser()
import View from './view/index.js'
import $ from 'jquery'

var environment = new Environment(analyser)
var view = new View(environment)

$('#open-url-form-btn').click(view.openForm)
$('#close-url-form-btn').click(view.closeForm)
$('#url-form').submit(function (e) {
  e.preventDefault()
  analyser.start($('#url-field').val())
          .then(view.closeForm)
          .fail(view.displayUrlError)
})

environment.startAnimation()
environment.addRingsToScene(200)
