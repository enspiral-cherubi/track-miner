import THREE from 'three'
import RingSegment from './ring-segment.js'
import TextureGenerator from './texture-generator.js'
import range from 'lodash.range'

class PiecewiseRing {

  constructor (props) {
    this.props = props
    this.initializeRingSegments()
  }

  initializeRingSegments () {
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
}


export default PiecewiseRing
