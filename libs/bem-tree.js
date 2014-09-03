var util = require("util"),
    BemElement = require('./bem-element.js'),
    BemBlock = require('./bem-block.js');

function BemTree() {
  this._blockNames = [];
  this._blocks = [];
}

BemTree.prototype.render = function () {
  var css = '';

  this._blocks.forEach(function (block) {
    css += block.render();
  })

  return css;
}

BemTree.prototype.parseRoot = function (root) {
  this._parseNode(root, null);
  this._clearBlocks();
  this._clearElements();;
  this._mergeAll();
}

BemTree.prototype._clearBlocks = function () {
  var isBlock = this._isAvaliableBlock.bind(this),
      validBlocks = [];

  this._blocks.forEach(function (block) {
    block.clearClassName(isBlock);

    if (block.name) {
      validBlocks.push(block);
    }
  })

  this._blocks = validBlocks;
}

BemTree.prototype._clearElements = function () {
  this._blocks.forEach(function (block) {
    block.clear();
  })
}

BemTree.prototype._mergeBlocks = function () {
  var uniqueBlocks = [];

  this._blocks.forEach(function (block) {
    var hasSameName = false;

    uniqueBlocks.forEach(function (uniqueBlock) {
      if (uniqueBlock.name === block.name) {
        hasSameName = true;
        uniqueBlock.merge(block);
      }
    })

    if (!hasSameName) {
      uniqueBlocks.push(block);
    }
  });
}

BemTree.prototype._mergeAll = function () {
  this._mergeBlocks();

  this._blocks.forEach(function (block) {
    block.mergeElements();
  });
}

BemTree.prototype._isAvaliableBlock = function (className) {
  return !!~this._blockNames.indexOf(className);
}

BemTree.prototype._parseNode = function (rootNode, parent) {
  var nodes = rootNode.children,
      self = this;

  if(nodes) {
    nodes.map(function (node) {
      var bemNode;

      if (node.name && node.attribs.class) {
        bemNode = self._getBemNode(node);

        parent && parent.addChild(bemNode);
        self._parseNode(node, bemNode);
      }
    });
  }
}

BemTree.prototype._getBemNode = function (pureNode) {
  var isElement = false,
      classes = pureNode.attribs.class.split(/\s/),
      self = this,
      node;

  classes.forEach(function (className) {
    if (BemElement.isElement(className)) {
      isElement = true;
      self._addBlockName(className);
    }
  })

  if (isElement) {
    node = new BemElement(pureNode);
  } else {
    node = new BemBlock(pureNode);

    //create list of all bem blocks
    this._blocks.push(node);
  }

  return node;
}

BemTree.prototype._addBlockName = function (className) {
  var blockName = className.split('__')[0];

  if (!~this._blockNames.indexOf(blockName)) {
    this._blockNames.push(blockName);
  }
}

module.exports = BemTree;