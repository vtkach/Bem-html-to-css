var util = require("util"),
    events = require("events");

function Node(pureNode) {
  events.EventEmitter.call(this);

  this.classes = pureNode.attribs.class.split(/\s/);
  this.name = '';

  this._parent = null;
  this._children = [];
  this._modificators = [];
}

util.inherits(Node, events.EventEmitter);

Node.prototype._setParent = function (parent) {
  this._parent = parent;
}

Node.prototype.addChild = function (node) {
  node._setParent(this);
  this._children.push(node);
}


Node.prototype.addChildren = function (nodes) {
  if (nodes instanceof Array) {
    nodes.forEach(this._addChild.bind(this));
  } else {
    this._addChild(nodes);
  }
}

Node.prototype.clearParent = function (nodes) {
  this._parent = null;
}

Node.prototype.clear = function (nodes) {
  var validNodes = [];

  this._children.forEach(function (node) {
    if (node.name) {
      validNodes.push(node);
      node.clear();
    }
  })

  this._children = validNodes;
}

module.exports = Node;