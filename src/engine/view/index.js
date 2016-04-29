import $ from 'jquery'

class View {

  updateCoordDisplay (opts) {
    $('#X').text('X / ' + opts.x)
    $('#Y').text('Y / ' + opts.y)
    $('#R').text('R / ' + opts.r)
    $('#T').text('T / ' + opts.theta)
  }

  openForm () {
    $('#url-form-container').show()
    $('#open-url-form-btn').hide()
  }

  closeForm () {
    $('#url-form-container').hide()
    $('#open-url-form-btn').show()
    $('#url-form-error').hide()
  }

  displayUrlError () {
    $('#url-form-error').css('display', 'inline-block')
    $('#url-field').val('')
  }

  closeLoadingScreen () {
    $('#loading-screen').hide()
  }

  closeHelpScreen () {
    $('#help-screen').hide()
    $('#open-url-form-btn').show()
  }

  showBrowserWarningScreen () {
    $('#browser-warning-screen').show()
  }

}

export default View
