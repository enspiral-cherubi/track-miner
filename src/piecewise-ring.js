var THREE = require('three')
var RingSegment = require('./ring-segment')
var range = require('lodash.range')

var PiecewiseRing = function (props) {
  this.props = props
  this.initializeRingSegments()
}

PiecewiseRing.prototype.initializeRingSegments = function () {
  var centerX = this.props.centerX
  var centerY = this.props.centerY
  var radius = this.props.radius
  var numSegments = this.props.numSegments

  var thetaArray = range(0, Math.PI * 2, (Math.PI * 2) / numSegments)
  var coordsArray = thetaArray.map(function (theta) {
    return {
      x: centerX + radius * Math.cos(theta),
      y: centerY + radius * Math.sin(theta)
    }
  })

  this.segments = coordsArray.map(function (coords) {
    var segment = RingSegment()
    segment.position.x = coords.x
    segment.position.y = coords.y
    return segment
  })
}

module.exports = PiecewiseRing
