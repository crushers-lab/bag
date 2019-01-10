"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ICloneable_1 = require("../Collection/ICloneable");
var Node = /** @class */ (function () {
    function Node(value) {
        this._value = value;
        this._links = new Map();
    }
    Object.defineProperty(Node.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "links", {
        get: function () {
            var it = this._links.keys();
            var keys = [];
            for (var key in it) {
                if (key) {
                    keys.push(key);
                }
            }
            return keys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "left", {
        get: function () {
            return this._link(Node.LEFT);
        },
        set: function (node) {
            this.setLink(Node.LEFT, node);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "right", {
        get: function () {
            return this._link(Node.RIGHT);
        },
        set: function (node) {
            this.setLink(Node.RIGHT, node);
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.setLink = function (key, value) {
        this._links.set(key, value);
    };
    Node.prototype.unlink = function (key) {
        this._links.delete(key);
    };
    Node.prototype.clone = function () {
        var value = this.value ? (ICloneable_1.isCloneable(this.value) ? this.value.clone() : this.value) : null;
        var node = new Node(value);
        this._links.forEach(function (n, key) { return node._links.set(key, n ? n.clone() : null); });
        return node;
    };
    Node.prototype._link = function (key) {
        if (this._links.has(key)) {
            return this._links.get(key);
        }
        return null;
    };
    Node.LEFT = "left";
    Node.RIGHT = "right";
    return Node;
}());
exports.default = Node;
