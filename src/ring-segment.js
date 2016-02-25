var THREE = require('three')

module.exports = function (props) {
  var geometry = new THREE.CubeGeometry(1, 0.5, 5)
  var material = new THREE.MeshBasicMaterial({color: 0x000000})
  var mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = props.x0 + props.r * Math.cos(props.theta)
  mesh.position.y = props.y0 + props.r * Math.sin(props.theta),
  mesh.position.z = props.z
  mesh.rotation.z = props.theta
  return mesh
}
