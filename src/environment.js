var THREE = require('three')
var WindowResize = require('three-window-resize')
var OrbitControls = require('three-orbit-controls')(THREE)
var TubeControls = require('./tube-controls')(THREE)
var PiecewiseRing = require('./piecewise-ring')
var range = require('lodash.range')
var $ = require('jquery')

module.exports = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000),
  renderer: new THREE.WebGLRenderer({alpha: true}),

  init: function (analyser) {
    this.analyser = analyser

    var windowResize = new WindowResize(this.renderer, this.camera)

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    this.controls = new TubeControls(this.camera, document.body)
    this.controls.autoForward = true
    this.controls.movementSpeed = 0.4
    this.controls.rollSpeed = 0.0005

    this.camera.position.z = 5000
  },

  startAnimation: function () {
    var self = this
    var lastTimeMsec = null

    requestAnimationFrame(function render (nowMsec) {
      requestAnimationFrame(render)

      lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
      var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
      lastTimeMsec  = nowMsec
      self.updateRingWithFrequencyData()

      var x = parseInt(self.controls.object.position.x)
      var y = parseInt(self.controls.object.position.y)
      var r = parseInt(Math.sqrt(Math.pow(x,2) + Math.pow(y,2)))
      var theta = parseInt((self.controls.object.rotation.z * 57.2958) % 360)

      self.updateCoordDisplay(x, y, r, theta)

      self.controls.update(deltaMsec/1000)

      self.renderer.render(self.scene, self.camera)
    })
  },

  addRingsToScene: function (num) {
    this.rings = range(num).map(function (z) {
      return new PiecewiseRing({ x0: 0, y0: 0, r: 400, numSegments: 51, z: z * 50})
    })
    this.rings.forEach(this.addRingToScene.bind(this))
  },

  addRingToScene: function (ring) {
    var self = this
    ring.segments.forEach(function (segment, i) {
      self.scene.add(segment)
    })
  },

  updateRingWithFrequencyData: function () {
    var frequencyData = this.analyser.getFrequencyData()
    this.rings.forEach(function (ring) {
      ring.segments.forEach(function (segment, i) {
        segment.scale.x = frequencyData[i] * 3 + 1
      })
    })
  },

  updateCoordDisplay: function (x, y, r, theta) {
    $('#X').text('X / ' + x)
    $('#Y').text('Y / ' + y)
    $('#R').text('R / ' + r)
    $('#T').text('T / ' + theta)
  }
}
