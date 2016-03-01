var THREE = require('three')

module.exports = function TextureGenerator() {
  var COLORS = ['#000000', '#910000', '#CBB370', '#21786C'],
   textures = {};

  this.generate = function(theta) {
    index = Math.floor(theta * Math.PI) % COLORS.length;

    if (textures[index]) { return textures[index]; }
    var size = 100

    // create canvas
    var canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size

    // get context
    var context = canvas.getContext('2d')

    // draw gradient
    context.rect(0, 0, size, size)
    var gradient = context.createLinearGradient(0, 0, size, 0)
    gradient.addColorStop(0, COLORS[index]) // light blue
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    context.fillStyle = gradient
    context.fill()

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true
    return textures[index] = texture
  }
}
