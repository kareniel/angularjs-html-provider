# angularjs-html-provider

[![stability][0]][1] 
[![downloads][8]][9] 
[![js-standard-style][10]][11]


Compile html on the fly inside your components using template literals.
Useful if you want to write components that render other components with arbitrary templates,
such as tables with interactive widgets.
 

## Usage

Inject `$scope` and the `$html` provider in a component.
Calling `$http` with `$scope` as it's only argument will return a tag function. 
 
`var html = $html($scope)`  
 
`html\`<div></div>\``  


## Example

#### my-button.component.js

```js
MyButtonCtrl.$inject = ['$element']

module.exports = {
  controller: MyButtonCtrl,
  bindings: {
    view: '<'
  }
}

function MyButtonCtrl ($element) {
  this.$postLink = function () {
    var world = 'world'
    var el = this.view(world)

    $element.replaceWith(el)
  }
}
```

#### page.template.html

```html
<main>
  <page>
    <my-button view="$ctrl.buttonView"></my-button>
  </page>
</main>

```

#### page.component.js:

```js
Ctrl.$inject = ['$scope', '$html']

module.exports = {
  controller: PageCtrl,
  templateUrl: '/page.template.html'
}

function PageCtrl ($scope, $html, Button) {
  var html = $html($scope)

  this.onClick = function (value) {
    alert(`Hello ${value}.`)
  }

  this.buttonView = function (world) {
    return html`
      <button style="background-color: red;" ng-click="$ctrl.onClick('${world}')">
        click me!
      </button>`
  }
}
```


## Installation

`npm install angularjs-html-provider`


## License

[MIT](LICENSE)


[0]: https://img.shields.io/badge/stability-stable-green.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[8]: http://img.shields.io/npm/dm/angularjs-html-provider.svg?style=flat-square
[9]: https://npmjs.org/package/angularjs-html-provider
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
