import THREE from 'three'
import WindowResize from 'three-window-resize'
import ThreeOrbitControls from 'three-orbit-controls'
var OrbitControls = ThreeOrbitControls(THREE)
import ThreeFlyControls from './tube-controls.js'
var TubeControls = ThreeFlyControls(THREE)
import PiecewiseRing from './piecewise-ring.js'
import range from 'lodash.range'
import $ from 'jquery'

class Environment {

  constructor (analyser) {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: document.getElementById('environment')})
    this.analyser = analyser
    var windowResize = new WindowResize(this.renderer, this.camera)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
    this.startControls()
    this.camera.position.z = 5000
  }

  startControls () {
    this.controls = new TubeControls(this.camera, document.body)
    this.controls.autoForward = true
    this.controls.movementSpeed = 0.4
    this.controls.rollSpeed = 0.0005
  }

  stopControls () {
    this.controls = null
  }

  startAnimation () {
    var self = this
    var lastTimeMsec = null

    requestAnimationFrame(function render (nowMsec) {
      requestAnimationFrame(render)

      lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
      var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
      lastTimeMsec  = nowMsec
      if (self.analyser.isRunning()) { self.updateRingWithFrequencyData() }

      if (self.controls) {
        self.controls.update(deltaMsec/1000)
        self.updateCoordDisplay()
      }

      self.renderer.render(self.scene, self.camera)
    })
  }

  addRingsToScene (num) {
    this.rings = range(num).map(function (z) {
      return new PiecewiseRing({ x0: 0, y0: 0, r: 400, numSegments: 51, z: z * 50})
    })
    this.rings.forEach(this.addRingToScene.bind(this))
  }

  addRingToScene (ring) {
    var self = this
    ring.segments.forEach(function (segment, i) {
      self.scene.add(segment)
    })
  }

  updateRingWithFrequencyData () {
    var frequencyData = this.analyser.getFrequencyData()
    this.rings.forEach(function (ring) {
      ring.segments.forEach(function (segment, i) {
        segment.scale.x = frequencyData[i] * 3 + 1
      })
    })
  }

  updateCoordDisplay () {
    var x = parseInt(this.controls.object.position.x)
    var y = parseInt(this.controls.object.position.y)
    var r = parseInt(Math.sqrt(Math.pow(x,2) + Math.pow(y,2)))
    var theta = parseInt((this.controls.object.rotation.z * 57.2958) % 360)
    $('#X').text('X / ' + x)
    $('#Y').text('Y / ' + y)
    $('#R').text('R / ' + r)
    $('#T').text('T / ' + theta)
  }

}

export default Environment
