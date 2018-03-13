htmlProvider.$inject = []

module.exports = angular
  .module('angularjs-html-provider', [])
  .provider('$html', htmlProvider)

function htmlProvider () {
  return {
    $get: function () {
      return bindToScope
    }
  }

  function bindToScope (scope) {
    return html.bind(scope)
  }

  function html (templateStringsArray) {
    var scope = this
    var template = templateStringsArray.reduce((a, b) => a.concat(b), '')
    var injector = angular.element(document).injector()

    return injector.invoke(['$compile', render])

    function render ($compile) {
      var el = $compile(template)(scope)

      return el
    }
  }
}
