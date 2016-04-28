import Environment from './environment/index.js'
var clientId = process.env.CLIENT_ID
import View from './view/index.js'

var environment = new Environment()
environment.startAnimation()
environment.addRingsToScene(200)

var view = new View(environment)
view.bindEventListeners()
