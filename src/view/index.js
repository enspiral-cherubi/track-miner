import $ from 'jquery'

class View {

  constructor (environment) {
    this.environment = environment
  }

  openForm () {
    $('#url-form-container').show()
    $('#open-url-form-btn').hide()
    this.environment.stopControls()
  }

  closeForm () {
    $('#url-form-container').hide()
    $('#open-url-form-btn').show()
    $('#url-form-error').hide()
    this.environment.startControls()
  }

  displayUrlError () {
    $('#url-form-error').css('display', 'inline-block')
    $('#url-field').val('')
  }

}

export default View
