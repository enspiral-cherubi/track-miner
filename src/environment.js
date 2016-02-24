var THREE = require('three')
var WindowResize = require('three-window-resize')
var OrbitControls = require('three-orbit-controls')(THREE)

module.exports = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
  renderer: new THREE.WebGLRenderer({alpha: true}),
  init: function () {
    var windowResize = new WindowResize(this.renderer, this.camera)
    var controls = new OrbitControls(this.camera)

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    var geometry = new THREE.TorusGeometry(10, 0.5, 30, 200, 6.3)
    var material = new THREE.MeshBasicMaterial({color: 0x000000})
    var ring = new THREE.Mesh(geometry, material)
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
