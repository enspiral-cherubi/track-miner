import $ from 'jquery'

class View {

  constructor (environment) {
    this.environment = environment
  }

  bindEventListeners () {
    $('#open-url-form-btn').click(this._openForm.bind(this))
    $('#close-url-form-btn').click(this._closeForm.bind(this))
    $('#url-form').submit((e) => {
      e.preventDefault()
      this.environment.analyser.start($('#url-field').val())
          .then(this._closeForm.bind(this))
          .fail(this._displayUrlError.bind(this))
    })
  }

  // 'private'

  _openForm () {
    $('#url-form-container').show()
    $('#open-url-form-btn').hide()
    this.environment.stopControls()
  }

  _closeForm () {
    $('#url-form-container').hide()
    $('#open-url-form-btn').show()
    $('#url-form-error').hide()
    this.environment.startControls()
  }

  _displayUrlError () {
    $('#url-form-error').css('display', 'inline-block')
    $('#url-field').val('')
  }

}

export default View
