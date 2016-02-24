var environment = require('./environment')
var SpectrumAnalyser = require('./spectrum-analyser')

environment.init()
environment.startAnimation()
environment.addRingToScene()

var analyser = new SpectrumAnalyser()
analyser.start('https://soundcloud.com/djlongdicks/alchemy')
