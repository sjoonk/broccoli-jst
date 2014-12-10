var path = require('path');
var Filter = require('broccoli-filter');
var jsStringEscape = require('js-string-escape');
var _ = require('lodash');

module.exports = JSTFilter;

JSTFilter.prototype = Object.create(Filter.prototype)
JSTFilter.prototype.constructor = JSTFilter;

function JSTFilter(inputTree, options) {
  if (!(this instanceof JSTFilter)) return new JSTFilter(inputTree, options);
  this.inputTree = inputTree;
  this.options = options || {};
  // this.extensions = options.extensions;
  // this.compileFunction = options.compileFunction || '';
}

JSTFilter.prototype.extensions = ['jst', 'ejs'];
JSTFilter.prototype.targetExtension = 'js';

JSTFilter.prototype.processString = function(string, relativePath) {
    var extensionRegex = /.jst|.ejs/gi;
    var filename = relativePath.toString().split('templates' + path.sep).reverse()[0].replace(extensionRegex, '');

  // return 'export default ' + this.compileFunction +
  //   '("' + jsStringEscape(string) + '");\n'

    return "JST['" + filename + "'] = " + _.template(string).source + ";\n";
};