var THREE = require('three')
var WindowResize = require('three-window-resize')
var OrbitControls = require('three-orbit-controls')(THREE)
var TubeControls = require('./tube-controls')(THREE)
var PiecewiseRing = require('./piecewise-ring')
var range = require('lodash.range')
var $ = require('jquery')

module.exports = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000),
  renderer: new THREE.WebGLRenderer({alpha: true}),

  init: function (analyser) {
    this.analyser = analyser

    var windowResize = new WindowResize(this.renderer, this.camera)

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    this.startControls()

    this.camera.position.z = 5000
  },

  startControls: function () {
    this.controls = new TubeControls(this.camera, document.body)
    this.controls.autoForward = true
    this.controls.movementSpeed = 0.4
    this.controls.rollSpeed = 0.0005
  },

  stopControls: function () {
    this.controls = null
  },

  startAnimation: function () {
    var self = this
    var lastTimeMsec = null
    var startTime = +new Date();

    requestAnimationFrame(function render (nowMsec) {
      requestAnimationFrame(render)

      lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
      var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
      lastTimeMsec  = nowMsec
      if (self.analyser.isRunning()) { self.updateRingWithFrequencyData(deltaMsec) }

      self.rings.forEach(function (ring) {
        ring.segments.forEach(function(segment, i) {
          ring.props.duration = 50000
          segment.position.x = segment.props.x0 + segment.props.r * Math.cos(segment.props.theta + (((nowMsec - startTime) / ring.props.duration) * Math.PI) % (2 * Math.PI))
          segment.position.y = segment.props.y0 + segment.props.r * Math.sin(segment.props.theta + (((nowMsec - startTime) / ring.props.duration) * Math.PI) % (2 * Math.PI)),
          segment.position.z = segment.props.z
          segment.rotation.z = segment.props.theta + (((nowMsec - startTime)  / ring.props.duration) * Math.PI) % (2 * Math.PI)
        });
      });
      
      if (self.controls) {
        self.controls.update(deltaMsec/1000)
        self.updateCoordDisplay()
      }

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

  updateRingWithFrequencyData: function (msec) {
    function dist(vector0, vector1){

      deltaX = vector1.x - vector0.x;
      deltaY = vector1.y - vector0.y;
      deltaZ = vector1.z - vector0.z;

      distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

      return distance;
    }
    
    var frequencyData = this.analyser.getFrequencyData(),
      that = this
    this.rings.forEach(function (ring) {
      ring.segments.forEach(function (segment, i) {
        distance = dist(segment.position, that.camera.position)
        distanceMultiplier = Math.min(0.75, distance / 2500);
        if(distance > 3000) return
                
        segment.scale.x = (frequencyData[i] * 2.5 + 1) * (distanceMultiplier * 1.15)
        segment.scale.y = (frequencyData[i] * 0.075 + 1) * (distanceMultiplier * 0.75)
      })
    })
  },

  updateCoordDisplay: function () {
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
