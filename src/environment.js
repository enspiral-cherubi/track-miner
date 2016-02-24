var THREE = require('three')
var WindowResize = require('three-window-resize')
var OrbitControls = require('three-orbit-controls')(THREE)
var PiecewiseRing = require('./piecewise-ring')
var range = require('lodash.range')

module.exports = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
  renderer: new THREE.WebGLRenderer({alpha: true}),

  init: function () {
    var windowResize = new WindowResize(this.renderer, this.camera)
    var controls = new OrbitControls(this.camera)

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    this.addRingToScene()

    this.camera.position.z = 50
  },

  startAnimation: function () {
    var self = this
    requestAnimationFrame(function render () {
      requestAnimationFrame(render)
      self.renderer.render(self.scene, self.camera)
    })
  },

  addRingToScene: function () {
    var self = this
    var ring = new PiecewiseRing({centerX: 0, centerY: 0, radius: 40, numSegments: 100})
    ring.segments.forEach(function (segment, i) {
      self.scene.add(segment)
    })
  }
}
