var THREE = require('three')
var WindowResize = require('three-window-resize')
var OrbitControls = require('three-orbit-controls')(THREE)
var PiecewiseRing = require('./piecewise-ring')
var range = require('lodash.range')

module.exports = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
  renderer: new THREE.WebGLRenderer({alpha: true}),
  ring: new PiecewiseRing({ x0: 0, y0: 0, r: 40, numSegments: 128 }),

  init: function (analyser) {
    this.analyser = analyser

    var windowResize = new WindowResize(this.renderer, this.camera)
    var controls = new OrbitControls(this.camera)

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    this.camera.position.z = 100
  },

  startAnimation: function () {
    var self = this
    requestAnimationFrame(function render () {
      requestAnimationFrame(render)
      self.updateRingWithFrequencyData()
      self.renderer.render(self.scene, self.camera)
    })
  },

  addRingToScene: function () {
    var self = this
    this.ring.segments.forEach(function (segment, i) { self.scene.add(segment) })
  },

  updateRingWithFrequencyData: function () {
    var frequencyData = this.analyser.getFrequencyData()
    this.ring.segments.forEach(function (segment, i) {
      segment.scale.x = frequencyData[i] / 10
    })
  }
}
