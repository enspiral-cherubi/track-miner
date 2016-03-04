var THREE = require('three')

function makeColorGradient(frequency1, frequency2, frequency3,
                           phase1, phase2, phase3,
                           center, width, len)
{
  if (center == undefined)   center = 128;
  if (width == undefined)    width = 127;
  if (len == undefined)      len = 50;

  var colors = [];
  for (var i = 0; i < len; ++i)
  {
    var red = Math.sin(frequency1*i + phase1) * width + center;
    var grn = Math.sin(frequency2*i + phase2) * width + center;
    var blu = Math.sin(frequency3*i + phase3) * width + center;
    colors.push([parseInt(red), parseInt(grn), parseInt(blu)]);
  }
  
  return colors;
}


module.exports = function TextureGenerator() {
  var COLORS = makeColorGradient(.3,.3,.3,0,2,4),
   textures = {};


  // create canvas
  var canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    size = 128,
    index

  canvas.width = size
  canvas.height = size


  this.generate = function(theta) {
    index = Math.floor(COLORS.length * theta / (Math.PI * 2)) % COLORS.length;
    var color = COLORS[index]

    if (textures[index]) { return textures[index]; }

    context.clearRect(0, 0, size, size);
    context.rect(0, 0, size, size)
    var gradient = context.createLinearGradient(0, 0, size, 0)
    gradient.addColorStop(0, 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ', 1)')
    gradient.addColorStop(1, 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ', 0)')
    context.fillStyle = gradient
    context.fill()

    var texture = new THREE.Texture(context.getImageData(0, 0, size, size));
    texture.minFilter = THREE.NearestFilter;
    texture.needsUpdate = true
    return textures[index] = texture
  }
}
