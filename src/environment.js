var THREE = require('three')
var WindowResize = require('three-window-resize')
var OrbitControls = require('three-orbit-controls')(THREE)
var PiecewiseRing = require('./piecewise-ring')

module.exports = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
  renderer: new THREE.WebGLRenderer({alpha: true}),
  init: function () {
    var windowResize = new WindowResize(this.renderer, this.camera)
    var controls = new OrbitControls(this.camera)

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    var ring = PiecewiseRing()
    this.scene.add(ring)

    this.camera.position.z = 20
  },
  startAnimation: function () {
    var self = this
    requestAnimationFrame(function render () {
      requestAnimationFrame(render)
      self.renderer.render(self.scene, self.camera)
    })
  }
}
