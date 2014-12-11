var path = require('path');
var Filter = require('broccoli-filter');
var jsStringEscape = require('js-string-escape');
var _ = require('lodash');

DEFAULTS = {
    extensions: ['jst'],  
    namespace: 'JST'
    // templateDir: 'templates'
};

module.exports = JSTFilter;

JSTFilter.prototype = Object.create(Filter.prototype)
JSTFilter.prototype.constructor = JSTFilter;

// JSTFilter.prototype.extensions = DEFAULTS.extensions;
JSTFilter.prototype.targetExtension = 'js';

function JSTFilter(inputTree, options) {
  if (!(this instanceof JSTFilter)) return new JSTFilter(inputTree, options);
  this.inputTree = inputTree;
  this.options = options || {};
  this.extensions = options.extensions || DEFAULTS.extensions;
  this.namespace = options.namespace || DEFAULTS.namespace;
  // this.compileFunction = options.compileFunction || '';
}

JSTFilter.prototype.processString = function(string, relativePath) {
    var extensionRegex = /\.[0-9a-z]+$/i;
    // var filename = relativePath.toString().split('templates' + path.sep).reverse()[0].replace(extensionRegex, '');
    var filename = relativePath.replace(extensionRegex, '');
    var compiled = _.template(string);

    return this.namespace + "['" + filename + "'] = " + compiled.source + ";\n";
};