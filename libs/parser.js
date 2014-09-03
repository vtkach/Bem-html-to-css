var htmlparser = require("htmlparser");
var sys = require("sys");
var fs = require("fs");
var BemTree = require('./bem-tree.js');
var bemTree = new BemTree();
var options;

options = { 
  verbose: false, 
  ignoreWhitespace: true 
};

function saveCss(htmlPath, cssPath, css) {
  var path;

  if (cssPath) {
    path = cssPath;
  } else {
    path = htmlPath.replace(/html$/, 'css');
  }

  fs.writeFile(path, css, function (err) {
    if (err) {
      throw err;
    }

    console.log('Succesful parsed to: ' + path);
  })
}

function BemHtmlToCss(options) {
  var parserHandler;
  var parserInstance;

  parserHandler = new htmlparser.DefaultHandler(function (error, dom) {
    var rootNode;

    if (error) {
      throw error
    }
    else {
      rootNode = {
        children: dom
      };

      bemTree.parseRoot(rootNode);
      saveCss(options.htmlPath, options.cssOutput, bemTree.render());
    }
  });

  parserInstance = new htmlparser.Parser(parserHandler);

  fs.readFile(options.htmlPath, function (err, html) {
    if (err) { 
      throw err;
    }

    parserInstance.parseComplete(html);
  })
}

module.exports = BemHtmlToCss;