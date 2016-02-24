var THREE = require('three')

module.exports = function () {
  var geometry = new THREE.CubeGeometry(6, 1, 0.33)
  var material = new THREE.MeshNormalMaterial({shading: THREE.FlatShading})
  var mesh = new THREE.Mesh(geometry, material)
  return mesh
}
