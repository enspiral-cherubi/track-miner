import THREE from 'three'
import WindowResize from 'three-window-resize'
import ThreeFlyControls from './tube-controls.js'
var TubeControls = ThreeFlyControls(THREE)
import PiecewiseRing from './piecewise-ring'
import range from 'lodash.range'

class Environment {
  constructor (opts) {
    this.opts = opts
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 3000)
    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: document.getElementById('environment')})
    var windowResize = new WindowResize(this.renderer, this.camera)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
    this.startControls()
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

  getCoords () {
    var x = parseInt(this.controls.object.position.x)
    var y = parseInt(this.controls.object.position.y)
    var r = parseInt(Math.sqrt(Math.pow(x,2) + Math.pow(y,2)))
    var theta = parseInt((this.controls.object.rotation.z * 57.2958) % 360)
    return {x: x, y: y, r: r, theta: theta}
  }

  getZ () {
    return parseInt(this.controls.object.position.z)
  }

  newRingReady () {
    return this.controls && this.getZ() % 50 === 0
  }

  addRingToEnd () {
    if (this.rings) {
      let ringToRemove = this.rings.shift()
      ringToRemove.removeFromScene(this.scene)
      let ringToAdd = new PiecewiseRing({ x0: 0, y0: 0, r: 400, numSegments: 48, z: this.opts.ringCount * -50 + this.getZ()})
      this.rings.push(ringToAdd)
      ringToAdd.addToScene(this.scene)
    }
  }

  addRingsToScene () {
    var promise = new Promise((resolve, reject) => {
      this.rings = range(this.opts.ringCount).map((z) => {
        var ring = new PiecewiseRing({ x0: 0, y0: 0, r: 400, numSegments: 48, z: z * -50})
        ring.segments.forEach(segment => this.scene.add(segment))
        return ring
      })
      resolve()
    })

    return promise
  }

  updateRingWithFrequencyData (frequencyData) {
    this.rings.forEach((ring) => {
      ring.segments.forEach((segment, i) => {
        segment.scale.x = frequencyData[Math.floor(i / 2)] * 4 + 1
      })
    })
  }

  render () {
    this.renderer.render(this.scene, this.camera)
  }
}

export default Environment
