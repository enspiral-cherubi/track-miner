var THREE = require('three')
var clientId = process.env.CLIENT_ID
import $ from 'jquery'
import Environment from './environment/index.js'
import View from './view/index.js'
import AudioInterface from './audio-interface/index.js'

var environment = new Environment()
var view = new View()
var audioInterface = new AudioInterface()

$('#open-url-form-btn').click(() => {
  view.openForm()
  environment.stopControls()
})

$('#close-url-form-btn').click(() => {
  view.closeForm()
  environment.startControls()
})

$('#url-form').submit((e) => {
  e.preventDefault()
  audioInterface.start($('#url-field').val())
    .then(() => {
      view.closeForm()
      environment.startControls()
    }).fail(view.displayUrlError)
})

var clock = new THREE.Clock()

requestAnimationFrame(function render () {
  requestAnimationFrame(render)

  if (audioInterface.isRunning()) {
    var frequencyData = audioInterface.getFrequencyData()
    environment.updateRingWithFrequencyData(frequencyData)
  }

  if (environment.controls) {
    var delta = clock.getDelta()
    view.updateCoordDisplay(environment.fetchCoords())
    environment.controls.update(delta)
  }

  environment.renderer.render(environment.scene, environment.camera)
})

environment.addRingsToScene(200)
