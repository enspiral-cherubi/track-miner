import THREE from 'three'

function ringSegment (props) {
  var geometry = new THREE.CubeGeometry(0.5, 3, 5)
  var mesh = new THREE.Mesh(geometry, props.material)
  mesh.position.x = props.x0 + props.r * Math.cos(props.theta)
  mesh.position.y = props.y0 + props.r * Math.sin(props.theta)
  mesh.position.z = props.z
  mesh.rotation.z = props.theta
  return mesh
}

export default ringSegment
