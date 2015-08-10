var path = require('path');
var Filter = require('broccoli-filter');
var jsStringEscape = require('js-string-escape');
var _ = require('lodash');

DEFAULTS = {
    extensions: ['jst'],  
    namespace: 'JST',
    templatesRoot: 'templates',
    templateSettings: {},
    amd: false
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
  this.templatesRoot = options.templatesRoot || DEFAULTS.templatesRoot;
  this.templateSettings = options.templateSettings || DEFAULTS.templateSettings;
  this.amd = options.amd || DEFAULTS.amd;
  // this.compileFunction = options.compileFunction || '';
}

JSTFilter.prototype.processString = function(string, relativePath) {
    var extensionRegex = /\.[0-9a-z]+$/i;
    // var filename = relativePath.replace(extensionRegex, '');
    var templateDir = path.normalize(this.templatesRoot + path.sep); 
    var filename = relativePath.split(templateDir).reverse()[0].replace(extensionRegex, '');
    var compiled = _.template(string, false, this.templateSettings);

    var result = [];
    result.push(compiled.source + ";\n")

    var namespaceString = null;
    var namespaceTemplateString = null;
    if (this.namespace !== false) {
      namespaceString = "this['" + this.namespace + "']";
      namespaceTemplateString = namespaceString + "['" + filename + "']";
  
      result.unshift(namespaceTemplateString + " = ");
      result.unshift(namespaceString + " = " + namespaceString + " || {};\n");
    }

    if (this.amd) {
      if (this.namespace === false) {
        result.unshift("return ");
      }
      result.unshift("define(function(){\n");
      if (this.namespace !== false) {
        result.push("return " + namespaceTemplateString + ";\n");
      }
      result.push("});");
    }

    return result.join("");
};