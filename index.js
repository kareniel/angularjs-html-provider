htmlProvider.$inject = []

module.exports = angular
  .module('angularjs-html-provider', [])
  .provider('$html', htmlProvider)

function htmlProvider () {
  var injector

  return {
    $get: function () {
      return function bindToScope (scope) {
        if (!injector) injector = angular.element(document).injector()

        return html.bind(scope)
      }
    }
  }

  function html (template) {
    var scope = this
    var values = Array.prototype.slice.call(arguments, 1)

    template = renderTemplateString(template, values)

    return injector.invoke(['$compile', compile])

    function compile ($compile) {
      var el = $compile(template)(scope)

      return el
    }
  }
}

function renderTemplateString (strings, values) {
  var value

  return strings.reduce((accumulator, part, i) => {
    value = values[i - 1]
    if (typeof value === 'undefined') value = ''
    return accumulator + value + part
  })
}
