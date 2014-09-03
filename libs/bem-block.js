var util = require("util");
var Node = require('./node');

function BemBlock() {
  Node.apply(this, arguments);
}

util.inherits(BemBlock, Node);

BemBlock.prototype.clearClassName = function (isBlock) {
  var trueClasses = [];

  this.classes.forEach(function (className) {
    isBlock(className) && trueClasses.push(className);
  })

  if (trueClasses.length > 1) {
    console.error('One node containes few blocks.');
  }

  this.name = trueClasses[0];
};

BemBlock.prototype.render = function () {
  var elements = '';
  var blockCss = '.' + this.name + ' {\n' + (this._children.length ? '  ' : '') + '}\n';

  this._children.forEach(function (element) {
    elements += element.render('  ');
  })

  return blockCss + elements;
};

BemBlock.prototype.merge = function (block) {
  this._children.concat(block._children);
};

BemBlock.prototype._getAllElements = function () {
  var elements = this._children;
  var allElement = [];

  elements.forEach(function (element) {
    allElement.concat(element._getChildrens());
  });

  return allElement.concat(elements);
}

BemBlock.prototype._mergeElement = function (el, uniqueElements) {
  var hasMerged = false;

  uniqueElements.forEach(function (uniqueEl) {
    if (uniqueEl.name === el.name) {
      hasMerged = true;
      uniqueEl.merge(el);
    }
  })

  if (!hasMerged) {
    uniqueElements.push(el);
  }

  return hasMerged;
};

BemBlock.prototype._goThroughTheTree = function (el, uniqueElements) {
  var self = this,
      uniqueChildren = [];

  el._children.forEach(function (childEl) {
    var notMerged = !self._mergeElement(childEl, uniqueElements);

    if(notMerged) {
      uniqueChildren.push(childEl);
    } else {
      childEl.clearParent();
    }

    self._goThroughTheTree(childEl, uniqueElements);
  })

  el._children = uniqueChildren;
}

BemBlock.prototype.mergeElements = function () {
  this._goThroughTheTree(this, []);
}

module.exports = BemBlock;