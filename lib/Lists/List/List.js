"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("../../Collection");
var exceptions_1 = require("../../exceptions");
var Node_1 = __importDefault(require("./Node"));
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._root = null;
        _this._length = 0;
        return _this;
    }
    Object.defineProperty(List.prototype, "root", {
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    List.prototype.clear = function () {
        this._root = null;
        this._length = 0;
    };
    List.prototype.clone = function () {
        var root = this._root ? this._root.clone() : null;
        var list = new List();
        list._root = root;
        list._length = this._length;
        return list;
    };
    List.prototype.delete = function (value) {
        this._assertRoot();
        var temp = this.root;
        if (temp.value === value) {
            this._root = temp.link;
            this._length--;
            return temp.value;
        }
        while (temp.link) {
            if (temp.link.value === value) {
                this._length--;
                temp.link = temp.link.link;
                return value;
            }
            temp = temp.link;
        }
        throw new exceptions_1.NotFoundException();
    };
    List.prototype.deleteAtBeginning = function () {
        this._assertRoot();
        var n = this.root;
        this._root = n.link;
        this._length--;
        return n.value;
    };
    List.prototype.deleteAtEnd = function () {
        this._assertRoot();
        var node = this.root;
        if (node.link === null) {
            this._root = null;
            this._length--;
            return node.value;
        }
        while (node.link.link) {
            node = node.link;
        }
        var last = node.link;
        node.link = null;
        this._length--;
        return last.value;
    };
    List.prototype.entries = function () {
        var root = this._root;
        if (root === null) {
            return [];
        }
        var entries = [];
        do {
            entries.push(root.value);
            root = root.link;
        } while (root);
        return entries;
    };
    List.prototype.insertAfter = function (search, value) {
        var res = this.getNode(search);
        var next = res.link;
        var node = new Node_1.default(value);
        res.link = node;
        node.link = next;
        this._length++;
        return this;
    };
    List.prototype.insertAt = function (index, value) {
        if (index >= this._length) {
            throw new exceptions_1.OutOfBoundsException();
        }
        var node = new Node_1.default(value);
        if (index === 0) {
            node.link = this.root;
            this._root = node;
            this._length++;
            return this;
        }
        var i = index;
        var root = this.root;
        while (i > 1) {
            root = root.link;
            i--;
        }
        this._length++;
        var next = root.link;
        root.link = node;
        node.link = next;
        return this;
    };
    List.prototype.insertAtBeginning = function (value) {
        this._length++;
        var node = new Node_1.default(value);
        node.link = this._root;
        this._root = node;
        return this;
    };
    List.prototype.insertAtEnd = function (value) {
        var node = new Node_1.default(value);
        if (this._root === null) {
            this._root = node;
            this._length++;
            return this;
        }
        var root = this.root;
        while (root.link) {
            root = root.link;
        }
        root.link = node;
        this._length++;
        return this;
    };
    List.prototype.insertBefore = function (search, value) {
        this._assertRoot();
        var root = this.root;
        if (root.link === null && search !== root.value) {
            throw new exceptions_1.NotFoundException();
        }
        while (root.link && root.link.value !== search) {
            root = root.link;
        }
        if (root.link === null) {
            throw new exceptions_1.NotFoundException();
        }
        var found = root.link;
        var node = new Node_1.default(value);
        root.link = node;
        node.link = found;
        this._length++;
        return this;
    };
    List.prototype.size = function () {
        return this._length;
    };
    List.prototype.getNode = function (value) {
        this._assertRoot();
        var root = this.root;
        do {
            if (root.value === value) {
                return root;
            }
            root = root.link;
        } while (root);
        throw new exceptions_1.NotFoundException();
    };
    List.prototype._assertRoot = function () {
        if (this._root === null) {
            throw new exceptions_1.EmptyCollectionException();
        }
    };
    return List;
}(Collection_1.AbstractCollection));
exports.default = List;
