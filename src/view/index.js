var $ = require('jquery')

module.exports = function (environment) {
  return {
    openForm: function () {
      $('#url-form-container').show()
      $('#open-url-form-btn').hide()
      environment.stopControls()
    },

    closeForm: function () {
      $('#url-form-container').hide()
      $('#open-url-form-btn').show()
      $('#url-form-error').hide()
      environment.startControls()
    },

    displayUrlError: function () {
      $('#url-form-error').css('display', 'inline-block')
      $('#url-field').val('')
    }
  }
}
