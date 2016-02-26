var environment = require('./environment')
var SpectrumAnalyser = require('./spectrum-analyser')

// var url = 'https://soundcloud.com/k2kokay/k2k-x-silkersoft-syke'
var url = 'https://soundcloud.com/whatisgoogins/over-the-hill'

var analyser = new SpectrumAnalyser()
analyser.start(url)

environment.init(analyser)
environment.startAnimation()
environment.addRingsToScene(200)
// analyser.mute()
