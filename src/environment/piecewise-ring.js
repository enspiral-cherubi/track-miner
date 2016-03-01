var THREE = require('three')
var RingSegment = require('./ring-segment')
var TextureGenerator = require('./texture-generator')
var range = require('lodash.range')

var PiecewiseRing = function (props) {
  this.props = props
  this.initializeRingSegments()
}

PiecewiseRing.prototype.initializeRingSegments = function () {
  var self = this
  var thetaArray = range(0, Math.PI * 2, (Math.PI * 2) / this.props.numSegments),
    textureGenerator = new TextureGenerator();

  this.segments = thetaArray.map(function (theta) {
    var material = new THREE.MeshBasicMaterial({map: textureGenerator.generate(theta), transparent: true})

    return RingSegment({
      material: material,
      x0: self.props.x0,
      y0: self.props.y0,
      r: self.props.r,
      z: self.props.z,
      theta: theta
    })
  })
}

module.exports = PiecewiseRing
