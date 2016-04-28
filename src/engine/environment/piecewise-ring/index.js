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
    var thetaArray = range(0, Math.PI * 2, (Math.PI * 2) / this.props.numSegments)
    var textureGenerator = new TextureGenerator()

    this.segments = thetaArray.map((theta) => {
      return RingSegment({
        material: new THREE.MeshBasicMaterial({map: textureGenerator.generate(theta), transparent: true}),
        x0: this.props.x0,
        y0: this.props.y0,
        r: this.props.r,
        z: this.props.z,
        theta: theta
      })
    })
  }

  removeFromScene (scene) {
    this.segments.forEach((segment) => scene.remove(segment))
  }

  addToScene (scene) {
    this.segments.forEach((segment) => scene.add(segment))    
  }
}


export default PiecewiseRing
