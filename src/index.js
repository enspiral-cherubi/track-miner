var environment = require('./environment')
var SpectrumAnalyser = require('./spectrum-analyser')

var analyser = new SpectrumAnalyser()
analyser.start('https://soundcloud.com/delicieuse-musique/premiere-apes-vanilla-ice?in=churchuk/sets/volumes-001')

environment.init(analyser)
environment.startAnimation()
environment.addRingToScene()
analyser.mute()
