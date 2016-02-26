var THREE = require('three')
var RingSegment = require('./ring-segment')
var range = require('lodash.range')

var PiecewiseRing = function (props) {
  this.props = props
  this.initializeRingSegments()
}

PiecewiseRing.prototype.initializeRingSegments = function () {
  var self = this
  var thetaArray = range(0, Math.PI * 2, (Math.PI * 2) / this.props.numSegments)
  this.segments = thetaArray.map(function (theta) {
    return RingSegment({
      x0: self.props.x0,
      y0: self.props.y0,
      r: self.props.r,
      z: self.props.z,
      theta: theta
    })
  })
}

module.exports = PiecewiseRing
