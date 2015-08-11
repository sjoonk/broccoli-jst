# broccoli-jst

A Broccoli filter for compiling JST templates into JavaScript.


## Install

```bash
$ npm install --save-dev broccoli-jst
```


## Example

```js
var jst = require('broccoli-jst');
tree = jst(tree, {
    extensions: ['ejs']         // optional (defaults to ['jst'])
,   namespace: 'App.JST'        // optional (defaults to 'JST')
,   templatesRoot: 'templates'  // optional (defaults to 'templates')
,   templateSettings: {}        // optional
,   amd: true                   // optional (defaults to 'false')
});
```


## License

MIT © [Sukjoon Kim](http://usefulparadigm.com)

