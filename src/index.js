var environment = require('./environment')
var SpectrumAnalyser = require('./spectrum-analyser')

var analyser = new SpectrumAnalyser()
analyser.start(url)

environment.init(analyser)
environment.startAnimation()
environment.addRingsToScene(200)
analyser.mute()
