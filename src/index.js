import Environment from './environment/index.js'
var clientId = process.env.CLIENT_ID
import SpectrumAnalyser from './spectrum-analyser/index.js'
var analyser = new SpectrumAnalyser()
import View from './view/index.js'

var environment = new Environment(analyser)
environment.startAnimation()
environment.addRingsToScene(200)

var view = new View(environment)
view.bindEventListeners()
