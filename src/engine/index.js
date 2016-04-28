import THREE from 'three'
import $ from 'jquery'
import Environment from './environment/index.js'
import View from './view/index.js'
import AudioInterface from './audio-interface/index.js'
import loop from 'raf-loop'

class Engine {
  constructor () {
    this.clock = new THREE.Clock()
    this.environment = new Environment({ringCount: 50})
    this.view = new View()
    this.audioInterface = new AudioInterface()
  }

  bindEventListeners () {
    $('#open-url-form-btn').click(this._openForm.bind(this))
    $('#close-url-form-btn').click(this._closeForm.bind(this))
    $('#url-form').submit(this._submitForm.bind(this))
  }

  start () {
    this.environment.addRingsToScene()

    loop((t) => {
      if (this.environment.newRingReady()) { this.environment.addRingToEnd() }

      if (this.audioInterface.isRunning()) {
        var frequencyData = this.audioInterface.getFrequencyData()
        this.environment.updateRingWithFrequencyData(frequencyData)
      }

      if (this.environment.controls) {
        let coords = this.environment.getCoords()
        this.view.updateCoordDisplay(coords)
        let delta = this.clock.getDelta()
        this.environment.controls.update(delta)
      }

      this.environment.render()
    }).start()
  }

  // 'private'

  _openForm () {
    this.view.openForm()
    this.environment.stopControls()
  }

  _closeForm () {
    this.view.closeForm()
    this.environment.startControls()
  }

  _submitForm (e) {
    e.preventDefault()
    this.audioInterface.start($('#url-field').val())
      .then(this._closeForm.bind(this))
      .fail(this.view.displayUrlError)
  }

}

export default Engine
