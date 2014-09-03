var util = require("util"),
    Node = require('./node');

var options = {
  modiferFormar:          '%s.%s__%s--%s{\n%s}\n',
  lastModiferFormar:      '%s.%s__%s--%s{\n%s  }\n',
  elemWithChildFormat:    '%s.%s__%s{\n%s  }\n',
  elemWithoutChildFormat: '%s.%s__%s{\n%s}\n'
};

function BemElement() {
  Node.apply(this, arguments);
  this._setName();
  this._parseModificators();
}

BemElement.isElement = function (className) {
  return ~className.indexOf('__');
}

util.inherits(BemElement, Node);

BemElement.prototype._setName = function () {
  var self = this;

  this.classes.forEach(function (className) {
    var splitClassName,
        splitName;

    if (BemElement.isElement(className)) {
      splitClassName = className.split('__');
      splitName = splitClassName[1].split('--');

      self.name = splitName[0];
      self.blockName = splitClassName[0];
    }
  })
}

BemElement.prototype._parseModificators = function () {
  var name = '__' + this.name,
      self = this;

  this.classes.forEach(function (className) {
    var modificator = className.split(name + '--')[1];

    modificator && self._modificators.push(modificator);
  })
}

BemElement.prototype._getChildrens = function () {
  var child = this._children,
      result = [];

  child.forEach(function (child, key) {
    result.concat(child._getChildrens());
  });

  return child.concat(result);
}

BemElement.prototype.merge = function (el) {
  this._modificators = this._modificators.concat(el._modificators);
  //this._children = this._children.concat(el._children);
}

BemElement.prototype.render = function (spaceBefore) {
  var children = this._children,
      self = this,
      pureElement,
      modifers = '',
      childElem = '',
      lastModifNumber = this._modificators.length - 1,
      parentFormat;


  this._modificators.forEach(function (modifer, index) {
    var format;

    if (index === lastModifNumber && children.length > 0) {
      format = options.lastModiferFormar;
    } else {
      format = options.modiferFormar;
    }
    
    modifers += util.format(format, spaceBefore, self.blockName, self.name, modifer, spaceBefore);
  });

  children.forEach(function (element) {
    if (element instanceof BemElement) {
      childElem += element.render(spaceBefore + '  ');
    }
  })

  if (childElem && !modifers) {
    parentFormat = options.elemWithChildFormat;
  } else {
    parentFormat = options.elemWithoutChildFormat;
  }

  pureElement = util.format(parentFormat, spaceBefore, self.blockName, self.name, spaceBefore);

  return pureElement + modifers + childElem;
}

module.exports = BemElement;
