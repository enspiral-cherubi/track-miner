import THREE from 'three'

class TextureGenerator {

  constructor () {
    this.colors = ['#000000', '#910000', '#CBB370', '#21786C'],
    this.textures = {}
  }

  generate (theta) {
    var index = Math.floor(theta * Math.PI) % this.colors.length;

    if (this.textures[index]) { return this.textures[index]; }
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
    gradient.addColorStop(0, this.colors[index]) // light blue
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    context.fillStyle = gradient
    context.fill()

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true
    return this.textures[index] = texture
  }
}

export default TextureGenerator
